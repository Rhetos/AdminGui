
function Install-RhetosServer() {

}

function Initialize-RhetosServer() {

}

function New-PluginBinaryDirectories() {

}

function Build-Plugins() {

}

function Build-Frontend() {

}

function New-NugetPackages() {

}

function Update-RhetosServer() {

}

function Register-IISExpressSite() {

}

function Set-AdminPermissions() {

}

function Remove-DebugPackages() {

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