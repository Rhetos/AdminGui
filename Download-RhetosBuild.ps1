$url = "http://github.com//Rhetos/Rhetos/releases/download/v2.8.0/Rhetos.2.8.0.zip"
$zipDstPath = "Rhetos.2.8.0.zip"
$dstPath = "2CS.RhetosBuild"
if (!(Test-Path $zipDstPath)) {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $url -OutFile $zipDstPath
}
Expand-Archive -Path $zipDstPath -DestinationPath ($dstPath + "/Rhetos")
Remove-Item $zipDstPath
Copy-Item ".\.nuget" -Destination ($dstPath + "/RhetosPackages") -Recurse
ECHO "Download and unzip successfully RhetosBuild v2.8"