<#
    Init.ps1
#>
[CmdletBinding()]
Param (

)
Begin {
    Import-Module $PSScriptRoot\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
}
Process {
    
    try {
        Push-Location $PSScriptRoot

        Write-Verbose "Download and install Rhetos server."
        Install-RhetosServer

        Write-Verbose "Initialize default configurations for the testing Rhetos server."
        Initialize-RhetosServer $SQLServer $DatabaseName

        Write-Verbose "Prepare directories required by the projects."
        New-PluginBinaryDirectories

        Pop-Location
    }
    catch {
        Write-Error "$($error[0])"
        $LASTEXITCODE = 1
        exit $LASTEXITCODE
    }

}
End {
    Write-Host "Initialized successfully." -ForegroundColor Green
    
    Remove-Module -Name "AdminGuiBuildCore"
}