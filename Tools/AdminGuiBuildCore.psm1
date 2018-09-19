
function Download-RhetosServer() {

}

function Prepare-RhetosServer() {

}

function Create-NecessaryDirectories() {

}

function Build-Plugins() {

}

function Build-Frontend() {

}

function Create-NugetPackages() {

}

function Deploy-RhetosServer() {

}

function Create-IISExpressSite() {

}

function Set-AdminPermissions() {

}

function Delete-DebugPackages() {

}

function Print-Usage() {
    Write-Host "------------------------------"
    Write-Host "Help: "
    Write-Host "To be implemented."
    Write-Host "------------------------------"
}
Set-Alias help Print-Usage

Export-ModuleMember -Function Print-Usage -Alias help

# Core function exporters
Export-ModuleMember -Function Download-RhetosServer
Export-ModuleMember -Function Prepare-RhetosServer
Export-ModuleMember -Function Create-NecessaryDirectories
Export-ModuleMember -Function Build-Plugins
Export-ModuleMember -Function Build-Frontend
Export-ModuleMember -Function Create-NugetPackages
Export-ModuleMember -Function Deploy-RhetosServer
Export-ModuleMember -Function Create-IISExpressSite
Export-ModuleMember -Function Set-AdminPermissions
Export-ModuleMember -Function Delete-DebugPackages