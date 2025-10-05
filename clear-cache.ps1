# AquaIntel - Complete Cache Clear Script (PowerShell)
# Run this script to fix all caching issues

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AquaIntel - Complete Cache Clear" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Stop all Node processes
Write-Host "[1/7] Stopping all Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1
Write-Host "Done." -ForegroundColor Green
Write-Host ""

# 2. Clear Android build cache
Write-Host "[2/7] Clearing Android build cache..." -ForegroundColor Yellow
Remove-Item -Path "android\app\build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "android\build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "android\.gradle" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Done." -ForegroundColor Green
Write-Host ""

# 3. Clear Expo cache
Write-Host "[3/7] Clearing Expo cache..." -ForegroundColor Yellow
Remove-Item -Path ".expo" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Done." -ForegroundColor Green
Write-Host ""

# 4. Clear Metro cache
Write-Host "[4/7] Clearing Metro bundler cache..." -ForegroundColor Yellow
Remove-Item -Path "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:TEMP\metro-*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:TEMP\react-*" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Done." -ForegroundColor Green
Write-Host ""

# 5. Clear npm cache
Write-Host "[5/7] Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null
Write-Host "Done." -ForegroundColor Green
Write-Host ""

# 6. Clear Watchman cache (if installed)
Write-Host "[6/7] Clearing Watchman cache..." -ForegroundColor Yellow
watchman watch-del-all 2>$null
Write-Host "Done (skipped if not installed)." -ForegroundColor Green
Write-Host ""

# 7. Clear Android app data on device (optional)
Write-Host "[7/7] Clearing app data on Android device..." -ForegroundColor Yellow
adb shell pm clear com.aquaintel.app 2>$null
Write-Host "Done (skipped if no device connected)." -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cache cleared successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting Expo with clean cache..." -ForegroundColor Yellow
Write-Host ""

# Start Expo with cleared cache
npx expo start -c
