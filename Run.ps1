<#
    Run.ps1
#>
[CmdletBinding()]
Param (
    [switch]$SkipIISExpress = $false
)
Begin {
    Import-Module $PSScriptRoot\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
 }
Process {
    try {
        Push-Location $PSScriptRoot

        Write-Verbose "Build the plugins."
        Build-Plugins
        if (!$?) { throw }

        Write-Verbose "Build AdminGui frontend"
        Build-Frontend
        if (!$?) { throw }

        Write-Verbose "Create new nuget packages"
        New-NugetPackages
        if (!$?) { throw }

        Write-Verbose "Update local testing Rhetos server with latest changes of local branch."
        Update-RhetosServer -ErrorAction Stop
        if (!$?) { throw }
        
        Write-Verbose "Register testing Rhetos server as an IIS Express website."
        Register-IISExpressSite $DatabaseName $Port
        if (!$?) { throw }

        Write-Verbose "Set required admin permissions."
        Set-AdminPermissions $SqlServer $DatabaseName
        if (!$?) { throw }

        if ($SkipIISExpress -eq $false) {
            Write-Verbose "Run the testing IIS Express website."
            & "C:\Program Files (x86)\IIS Express\iisexpress.exe" /config:"2CS.RhetosBuild\Rhetos\IISExpress.config"
        } else  { 
            Write-Verbose "Skipped the command: Running IIS Express website."
        }

        Pop-Location
    }
    catch {
        Write-Error "$($error[0])"
        $LASTEXITCODE = 1
        exit $LASTEXITCODE
    }
}
End {
    Remove-DebugPackages -Verbose:($PSCmdlet.MyInvocation.BoundParameters["Verbose"].IsPresent -eq $true)
    Remove-Module -Name "AdminGuiBuildCore"
}
