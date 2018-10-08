$DatabaseName = "TestAdminGui"
Export-ModuleMember -Variable 'DatabaseName'
$Port = "9000"
Export-ModuleMember -Variable 'Port'
$SQLServer = "(local)"
Export-ModuleMember -Variable 'SQLServer'

function Install-RhetosServer($rhetosVersion = "2.0.0") {
    $uri = "http://github.com//Rhetos/Rhetos/releases/download/v$rhetosVersion/Rhetos.$rhetosVersion.zip"
    $zipDstPath = ".\Rhetos.$rhetosVersion.zip"
    $dstPath = ".\2CS.RhetosBuild"

    if (!(Test-Path $dstPath)) {
        if (!(Test-Path $zipDstPath)) {
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

            try {
                Write-Host "Downloading Rhetos......."
                Invoke-WebRequest -Uri $uri -OutFile $zipDstPath
            }
            catch {
                Write-Error "$($error[0])"
                throw
            }
        }

        Expand-Archive -Path $zipDstPath -DestinationPath ($dstPath + "/Rhetos")
        Remove-Item $zipDstPath

        Write-Host "Download and unzip successfully RhetosBuild v$rhetosVersion."
    } else {
        Write-Warning "The directory $dstPath has already existed."
    }
}

function Initialize-RhetosServer($sqlServer, $databaseName) {
    try {
        Push-Location 2CS.RhetosBuild\Rhetos\bin\

        .\CreateAndSetDatabase.exe $sqlServer $databaseName

        Pop-Location
        
        Copy-Item -Path ".\RhetosPackages\*.config" -Destination ".\2CS.RhetosBuild\Rhetos\"
        Copy-Item -Path ".\RhetosPackages\*.bat" -Destination ".\2CS.RhetosBuild\Rhetos\"
    }
    catch {
        throw $_
    }

}

function New-PluginBinaryDirectories() {
    if (!(Test-Path ".\RhetosPackages\Plugins")) {
        New-Item -ItemType directory -Path ".\RhetosPackages\Plugins"
    }
    if (!(Test-Path ".\RhetosPackages\BasecodePlugins")) {
        New-Item -ItemType directory -Path ".\RhetosPackages\BasecodePlugins"
    }
}

function Set-MSBuildRegistryPath($toolVersion) {
    return "Registry::HKLM\SOFTWARE\Microsoft\MSBuild\ToolsVersions\$toolVersion"
}

$BuildToolPath = ""
$BuildToolCommand = ""
# Try to find the most recent version first (dotnet/msbuild 15). Eventually fall back to earlier versions.
function Set-BuildTools() {
    if (Get-Command dotnet) {
        $script:BuildToolPath = "dotnet"
        return
    }

    $version = 14
    $toolVersion = "$version.0"
    $registryKey = Set-MSBuildRegistryPath($toolVersion)
    $script:BuildToolPath = Join-Path -Path (Get-ItemProperty -Path $registryKey -Name "MSBuildToolsPath").MSBuildToolsPath -ChildPath "MSBuild.exe"

    if (!$?) {
        do {
            if ($version -eq 9) { break; }
            $version = $version - 1
            $toolVersion = "$version.0"
            $registryKey = Set-MSBuildRegistryPath($toolVersion)
            $script:BuildToolPath = Join-Path -Path (Get-ItemProperty -Path $registryKey -Name "MSBuildToolsPath").MSBuildToolsPath -ChildPath "MSBuild.exe"
        } while ($? -eq "False")
    }
}

function Build-Plugins($buildConfiguration = "Debug") {
    # Ensure the requirements are met if the user runs `publish` command without running `init` first.
    New-PluginBinaryDirectories

    Set-BuildTools
    
    if ($script:BuildToolPath -eq "dotnet") {
        $buildToolCommand = "msbuild"
    }

    $AdminGuiPluginFolder = '.\Plugins\AdminGuiPlugin\'

	nuget restore
    & $script:BuildToolPath $buildToolCommand $AdminGuiPluginFolder\AdminGuiPlugin.sln  /t:rebuild /p:configuration=$buildConfiguration

    Copy-Item -Path $AdminGuiPluginFolder\AdminGuiRhetosExtensions\bin\$buildConfiguration\AdminGuiRhetosExtensions.dll -Destination .\RhetosPackages\Plugins\ -Force
    Copy-Item -Path $AdminGuiPluginFolder\Angular2ModelGenerator\bin\$buildConfiguration\Angular2ModelGenerator.dll -Destination .\RhetosPackages\Plugins\ -Force
    Copy-Item -Path $AdminGuiPluginFolder\RhetosConceptsAndExtensions\bin\$buildConfiguration\RhetosConceptsAndExtensions.dll -Destination .\RhetosPackages\BasecodePlugins\ -Force
}

function Build-Frontend() {
    Push-Location .\AdminGUI

    if (!(Test-Path ".\node_modules")) {
        npm install
    } else {
        npm update
    }

    Write-Host "AdminGui NPM packages updated." -ForegroundColor Green
    
    npm run tsc

    Write-Host "AdminGui TypeScript compiled." -ForegroundColor Green
    
    npm run gulp default

    Write-Host "AdminGui prepared wwwroot." -ForegroundColor Green

    Pop-Location
}

function RegexReplace ($fileSearch, $replacePattern, $replaceWith) {
    Get-ChildItem $fileSearch -r | % {
        $c = [IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::Default) -Replace $replacePattern, $replaceWith;
        [IO.File]::WriteAllText($_.FullName, $c, [System.Text.Encoding]::UTF8)
    }
}

function Change-Version($buildVersion, $prereleaseVersion) {
    if ($prereleaseVersion -eq "auto") {
        $prereleaseText = ('A' + (get-date -format "yyMMddHHmm") + '-' + (git rev-parse --short HEAD))

        if ($prereleaseText.length -gt 20) {
            $prereleaseVersion = $prereleaseText.Substring(0, 20)
        }
        else {
            $prereleaseVersion = $prereleaseText.Substring(0, $prereleaseText.length)
        }
    } 

    if (![string]::IsNullOrEmpty($prereleaseVersion)) {
        $fullVersion = $buildVersion + '-' + $prereleaseVersion
    } else {
        $fullVersion = $buildVersion
    }

    Write-Output "Setting version $fullVersion."

    RegexReplace ".\AdminGui\*.nuspec" '([\n^]\s*\<version\>).*(\<\/version\>\s*)' ('${1}' + $fullVersion + '${2}')
}

function New-NugetPackages($buildVersion = "1.0.0", $prereleaseVersion = "auto", $isPublish = $false) {
    try {
        $OutputDIrectory = "."

        if ($isPublish) {
            if (Test-Path -Path ".\PublishOutput") {
                Remove-Item ".\PublishOutput\*.nupkg" 
            } else {
                New-Item -ItemType directory -Path ".\PublishOutput"
            }

            $OutputDIrectory = ".\PublishOutput"
        }

        Change-Version $buildVersion $prereleaseVersion
        nuget pack .\AdminGUI\Rhetos.AdminGui.nuspec -OutputDirectory $OutputDIrectory
        nuget pack .\AdminGUI\Rhetos.AdminGuiCompile.nuspec -OutputDirectory $OutputDIrectory
    }
    catch {
        throw $_
    }
}


function Update-RhetosServer() {
    [Cmdletbinding()]
    Param()

    try {
        .\2CS.RhetosBuild\Rhetos\bin\DeployPackages.exe /NOPAUSE
    }
    catch {
        throw
    }
}

function Register-IISExpressSite($databaseName, $port) {
    Push-Location .\2CS.RhetosBuild\Rhetos\bin\
    
    .\CreateIISExpressSite.exe $databaseName $port
    
    Pop-Location
}

function Set-AdminPermissions($sqlServer, $databaseName) {
    sqlcmd -s $sqlServer -d $databaseName -i ".\Tools\SecurityAdminPermissionSetup.sql"

    Write-Host "Admin permission set."
}

function Remove-DebugPackages() {
    [CmdletBinding()]
    Param()

    Write-Verbose "Prepare to delete debug packages."

    Remove-Item ".\*.nupkg" -Verbose:($PSCmdlet.MyInvocation.BoundParameters["Verbose"].IsPresent -eq $true)
    
    Write-Verbose "All debug packages are removed."
}


#####################################################################
# Core function exporters

# Download Rhetos server from GitHub and unzip it locally. No alternation or configuration is performed.
Export-ModuleMember -Function Install-RhetosServer

# Setup and perform necessary actions to run a Rhetos server on the local machine.
Export-ModuleMember -Function Initialize-RhetosServer

# Create new directories needed for developing AdminGui Plugins.
Export-ModuleMember -Function New-PluginBinaryDirectories

#
Export-ModuleMember -Function Build-Plugins

#
Export-ModuleMember -Function Build-Frontend

# Create new AdminGui Nuget packages
Export-ModuleMember -Function New-NugetPackages

#
Export-ModuleMember -Function Update-RhetosServer

#
Export-ModuleMember -Function Register-IISExpressSite

#
Export-ModuleMember -Function Set-AdminPermissions

# Debug Nuget packages are not ready for deployment and production. After we've done with local debugging sessions, thesse will be removed completely.
Export-ModuleMember -Function Remove-DebugPackages

#####################################################################