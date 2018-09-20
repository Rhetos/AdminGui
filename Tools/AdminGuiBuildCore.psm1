
$DatabaseName="TestAdminGui"
Export-ModuleMember -Variable 'DatabaseName'
$Port="9000"
Export-ModuleMember -Variable 'Port'
$SQLServer="(local)"
Export-ModuleMember -Variable 'SQLServer'

function Install-RhetosServer($rhetosVersion="2.0.0") {
    $url = "http://github.com//Rhetos/Rhetos/releases/download/v$rhetosVersion/Rhetos.$rhetosVersion.zip"
    $zipDstPath = ".\Rhetos.$rhetosVersion.zip"
    $dstPath = ".\2CS.RhetosBuild"
    if (!(Test-Path $dstPath)) {
        if (!(Test-Path $zipDstPath)) {
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            Try {
                Write-Verbose "Downloading Rhetos......."
                $wc = New-Object System.Net.WebClient
                $wc.DownloadFile($url, $zipDstPath)
            }
            Catch {
                Write-Error "$($error[0])"
            }
        
        }
        Expand-Archive -Path $zipDstPath -DestinationPath ($dstPath + "/Rhetos")
        Remove-Item $zipDstPath
        # Copy-Item ".\.nuget" -Destination ($dstPath + "/RhetosPackages/.nuget") -Recurse
        Write-Host "Download and unzip successfully RhetosBuild v$rhetosVersion"
    }
    else {
        Write-Warning "The directory $dstPath has already existed."
    }
}

function Initialize-RhetosServer($sqlServer, $databaseName) {
    try {
        cd 2CS.RhetosBuild\Rhetos\bin\
        .\CreateAndSetDatabase.exe $sqlServer $databaseName
        Copy-Item -Path "..\..\..\RhetosPackages\*.config" -Destination "..\"
        Copy-Item -Path "..\..\..\RhetosPackages\*.bat" -Destination "..\"
        cd ..\..\..\
    }
    catch {
        throw
    }

}

function New-PluginBinaryDirectories() {
    If(!(Test-Path ".\RhetosPackages\Plugins")) {
        New-Item -ItemType directory -Path ".\RhetosPackages\Plugins"
    }
    If(!(Test-Path ".\RhetosPackages\BasecodePlugins")) {
        New-Item -ItemType directory -Path ".\RhetosPackages\BasecodePlugins"
    }
}

function Build-Plugins() {
    cd RhetosPackages\Source\Angular2ModelGenerator
    dotnet build AdminGuiPlugin.sln
    cd ..\..\..\
}

function Build-Frontend() {
    cd AdminGUI
    if (!(Test-Path ".\node_modules")) {
        npm install
    } else {
        npm update
    }
    Write-Host "*** AdminGui NPM PACKAGES UPDATED. ***" -ForegroundColor Green

    npm run tsc
    Write-Host "*** AdminGui TypeScript compiled. ***" -ForegroundColor Green

    gulp default
    Write-Host "*** AdminGui prepared wwwroot. ***" -ForegroundColor Green

    cd ..
}

function RegexReplace ($fileSearch, $replacePattern, $replaceWith)
{
    Get-ChildItem $fileSearch -r | % {
        $c = [IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::Default) -Replace $replacePattern, $replaceWith;
        [IO.File]::WriteAllText($_.FullName, $c, [System.Text.Encoding]::UTF8)
    }
}

function Change-Version($buildVersion, $prereleaseVersion) {
    If($prereleaseVersion -eq "auto"){
        $prereleaseText = ('A' + (get-date -format "yyMMddHHmm") + '-' + (git rev-parse --short HEAD))
        If($prereleaseText.length -gt 20) {
            $prereleaseVersion = $prereleaseText.Substring(0,20)
        } Else {
            $prereleaseVersion = $prereleaseText.Substring(0,$prereleaseText.length)
        }
    } 

    If (![string]::IsNullOrEmpty($prereleaseVersion)) {
        $fullVersion = $buildVersion + '-' + $prereleaseVersion
    } Else {
        $fullVersion = $buildVersion
    }

    Write-Output "Setting version $fullVersion"
    cd AdminGui
    RegexReplace ".\*.nuspec" '([\n^]\s*\<version\>).*(\<\/version\>\s*)' ('${1}'+$fullVersion+'${2}')
    cd ..
}

function New-NugetPackages($buildVersion="1.0.0", $prereleaseVersion="auto") {
    try {
        Change-Version $buildVersion $prereleaseVersion
        nuget pack AdminGui\Rhetos.AdminGui.nuspec -OutputDirectory .
        nuget pack AdminGui\Rhetos.AdminGuiCompile.nuspec -OutputDirectory .
    }
    catch {
        throw
    }

}


function Update-RhetosServer() {
    [Cmdletbinding()]
    Param()
    try {
        cd 2CS.RhetosBuild\Rhetos\bin\
        .\DeployPackages.exe /NOPAUSE
        If(Test-Path ".\Plugins\AdminSetup.exe") {
            .\Plugins\AdminSetup.exe
        }
        cd ..\..\..\
    }
    catch {
        throw
    }

}

function Register-IISExpressSite($databaseName, $port) {
    cd 2CS.RhetosBuild\Rhetos\bin\
    .\CreateIISExpressSite.exe $databaseName $port
    cd ..\..\..\
}

function Set-AdminPermissions($sqlServer, $databaseName) {
    Invoke-Sqlcmd -ServerInstance $sqlServer -Database $databaseName
    Write-Host " 		***	SET PERMISSION DONE ***"
}

function Remove-DebugPackages() {
    Remove-Item ".\*.nupkg" 
}

function Get-Usage() {
    Write-Host "------------------------------"
    Write-Host "Help: "
    Write-Host "To be implemented."
    Write-Host "------------------------------"
}

Export-ModuleMember -Function Get-Usage

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