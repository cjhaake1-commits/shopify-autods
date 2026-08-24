param([int]$Port = 9222, [string]$Url = 'https://app.autods.com')
$ErrorActionPreference = 'Stop'
if ($env:EDGE_CDP_PORT) { $Port = [int]$env:EDGE_CDP_PORT }
if ($env:AUTODS_URL) { $Url = $env:AUTODS_URL }
$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge was not found. Install normal Microsoft Edge, then run npm run edge:cdp.' }
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$profile = Join-Path $root '.local\edge-autods-profile'
New-Item -ItemType Directory -Force -Path $profile | Out-Null
$args = "--remote-debugging-port=$Port --remote-debugging-address=127.0.0.1 --user-data-dir=`"$profile`" --no-first-run --no-default-browser-check $Url"
Start-Process -FilePath $edge -ArgumentList $args
Write-Output "Normal Microsoft Edge started with dedicated profile: $profile"
Write-Output "CDP loopback endpoint: http://127.0.0.1:$Port"
Write-Output 'Complete AutoDS authentication in that Edge window if prompted; leave Edge open.'
