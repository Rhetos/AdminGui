<#
    Init.ps1
#>
[CmdletBinding()]
Param (

)
Begin {
	
	Import-Module .\Tools\AdminGuiBuildCore.psm1 -Force -DisableNameChecking
}
Process {
	try {
		Install-RhetosServer

		Initialize-RhetosServer $SQLServer $DatabaseName

		New-PluginBinaryDirectories
	}
	catch {
		Write-Error "$($error[0])"
		$LASTEXITCODE = 1
		exit $LASTEXITCODE
	}

}
End {
	Remove-Module -Name "AdminGuiBuildCore"
}