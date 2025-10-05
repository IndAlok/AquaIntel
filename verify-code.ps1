# Code Verification Script
# Verifies that the source code has no useLegacyImplementation prop

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AquaIntel - Code Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Search for useLegacyImplementation in all JSX files
Write-Host "Searching for 'useLegacyImplementation' in source code..." -ForegroundColor Yellow
$results = Get-ChildItem -Recurse -Include *.jsx,*.js,*.tsx,*.ts -Exclude node_modules | 
    Select-String -Pattern "useLegacyImplementation\s*[:=]" -CaseSensitive

if ($results) {
    Write-Host "❌ FOUND useLegacyImplementation prop in:" -ForegroundColor Red
    $results | ForEach-Object {
        Write-Host "   $($_.Path):$($_.LineNumber) - $($_.Line.Trim())" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Fix these files to remove the prop!" -ForegroundColor Yellow
} else {
    Write-Host "✅ No useLegacyImplementation prop found in source code" -ForegroundColor Green
    Write-Host ""
    Write-Host "Source code is CLEAN!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Checking DrawerNavigator.jsx specifically..." -ForegroundColor Yellow

$drawerFile = "navigation\DrawerNavigator.jsx"
if (Test-Path $drawerFile) {
    $content = Get-Content $drawerFile -Raw
    
    # Check screenOptions
    if ($content -match "screenOptions\s*=\s*\{([^}]+)\}") {
        $screenOptions = $matches[1]
        Write-Host ""
        Write-Host "DrawerNavigator screenOptions:" -ForegroundColor Cyan
        Write-Host $screenOptions -ForegroundColor Gray
        
        if ($screenOptions -match "useLegacyImplementation") {
            Write-Host ""
            Write-Host "❌ FOUND useLegacyImplementation in screenOptions!" -ForegroundColor Red
        } else {
            Write-Host ""
            Write-Host "✅ No useLegacyImplementation in screenOptions" -ForegroundColor Green
        }
    }
} else {
    Write-Host "⚠️  DrawerNavigator.jsx not found at: $drawerFile" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Additional check for Drawer.Navigator
Write-Host "Checking all Drawer.Navigator instances..." -ForegroundColor Yellow
$drawerNavs = Get-ChildItem -Recurse -Include *.jsx,*.js -Exclude node_modules | 
    Select-String -Pattern "Drawer\.Navigator" -Context 0,10

$hasIssue = $false
foreach ($nav in $drawerNavs) {
    if ($nav.Context.PostContext -match "useLegacyImplementation") {
        Write-Host "❌ FOUND in $($nav.Path)" -ForegroundColor Red
        $hasIssue = $true
    }
}

if (-not $hasIssue) {
    Write-Host "✅ All Drawer.Navigator instances are clean" -ForegroundColor Green
}

Write-Host ""
Write-Host "If source code is clean but error persists:" -ForegroundColor Yellow
Write-Host "  1. Run: adb shell pm clear com.aquaintel.app" -ForegroundColor White
Write-Host "  2. Restart app or press 'a' in Metro" -ForegroundColor White
Write-Host ""
