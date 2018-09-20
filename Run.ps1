<#
    Run.ps1
#>

[CmdletBinding()]
Param (

)
Begin {
    Import-Module .\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
 }
Process {
    try {
        Build-Plugins
        Build-Frontend
        New-NugetPackages
        Update-RhetosServer -ErrorAction Stop
        Register-IISExpressSite $DatabaseName $Port
        Set-AdminPermissions $SqlServer $DatabaseName

        #Run IIS Express Site
        & "C:\Program Files (x86)\IIS Express\iisexpress.exe" /config:"2CS.RhetosBuild\Rhetos\IISExpress.config"

    }
    catch {
        Write-Error "$($error[0])"
        $LASTEXITCODE = 1
        exit $LASTEXITCODE
    }

}
End {
    Remove-DebugPackages
    Remove-Module -Name "AdminGuiBuildCore"
}
