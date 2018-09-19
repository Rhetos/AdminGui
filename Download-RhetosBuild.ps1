$rhetosVersion = "2.0.0"
$url = "http://github.com//Rhetos/Rhetos/releases/download/v$rhetosVersion/Rhetos.$rhetosVersion.zip"
$zipDstPath = "$PSScriptRoot\Rhetos.$rhetosVersion.zip"
$dstPath = "2CS.RhetosBuild"
if (!(Test-Path $dstPath)) {
    if (!(Test-Path $zipDstPath)) {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Try {
            $wc = New-Object System.Net.WebClient
            $wc.DownloadFile($url, $zipDstPath)
        }
        Catch {
            Write-Error "$($error[0])"
            Exit 1
        }
        
    }
    Expand-Archive -Path $zipDstPath -DestinationPath ($dstPath + "/Rhetos")
    Remove-Item $zipDstPath
    Copy-Item ".\.nuget" -Destination ($dstPath + "/RhetosPackages/.nuget") -Recurse
    Write-Host "Download and unzip successfully RhetosBuild v$rhetosVersion"
    Exit 0
}
else {
    Write-Warning "The directory $dstPath has already existed."
    Exit 0
}
