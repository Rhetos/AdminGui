<#
    Publish.ps1
#>
[CmdletBinding()]
Param (
    [string]$BuildVersion = "1.0.0"
)
Begin {
    Import-Module $PSScriptRoot\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
}
Process {
    try {
        Push-Location $PSScriptRoot

        Write-Verbose "Build plugins"
        Build-Plugins -buildConfiguration "Release"

        Write-Verbose "Build AdminGui frontend"
        Build-Frontend

        Write-Verbose "Create new nuget packages"
        New-NugetPackages -buildVersion $BuildVersion -prereleaseVersion "" -isPublish $true

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

    Write-Host "`nAdminGui NuGet packages are published succesfully.`n" -ForegroundColor Green

    Remove-Module -Name "AdminGuiBuildCore"
}