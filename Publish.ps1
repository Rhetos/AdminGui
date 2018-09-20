<#
    Publish.ps1
#>
[CmdletBinding()]
Param (

)
Begin {
    $BuildVersion = "1.0.0"
    Import-Module .\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
}
Process {
    try {
        Build-Plugins

        Build-Frontend

        New-NugetPackages -buildVersion $BuildVersion -prereleaseVersion "" -isPublish $true
    }
    catch {
        Write-Error "$($error[0])"
        $LASTEXITCODE = 1
        exit $LASTEXITCODE
    }
}
End {
    Remove-DebugPackages

    Write-Host "*** PUBLISH SUCCESSFULLY ***"

    Remove-Module -Name "AdminGuiBuildCore"
}