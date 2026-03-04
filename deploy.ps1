# Define source and destination
$SOURCE = "./backend"
$DEST = "C:/xampp/htdocs"

# 1. Check if the source folder exists
if (Test-Path $SOURCE) {
    Write-Host "Copying $SOURCE to $DEST..." -ForegroundColor Cyan
    
    Copy-Item -Path $SOURCE -Destination $DEST -Recurse -Force
    
    Write-Host "Done! Your backend is now at $DEST/backend" -ForegroundColor Green
}
else {
    Write-Host "Error: $SOURCE folder not found!" -ForegroundColor Red
    exit 1
}