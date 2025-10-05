@echo off
echo ========================================
echo FORCE CLEAN REBUILD - AquaIntel
echo ========================================
echo.
echo This script will:
echo 1. Kill all Node processes
echo 2. Uninstall app from device
echo 3. Clear ALL caches
echo 4. Rebuild with fresh bundle
echo.
pause
echo.

echo [Step 1/5] Killing all Node.js processes...
taskkill /F /IM node.exe 2>nul
echo Done.
echo.

echo [Step 2/5] Uninstalling old app from device...
adb uninstall com.aquaintel.app 2>nul
echo Done.
echo.

echo [Step 3/5] Clearing ALL caches and build artifacts...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist android\app\build rmdir /s /q android\app\build
if exist android\build rmdir /s /q android\build
if exist android\.gradle rmdir /s /q android\.gradle
if exist .gradle rmdir /s /q .gradle
adb shell pm clear com.aquaintel.app 2>nul
echo Done.
echo.

echo [Step 4/5] Clearing watchman cache (if available)...
watchman watch-del-all 2>nul
echo Done.
echo.

echo [Step 5/5] Starting Expo with COMPLETELY fresh cache...
echo Production mode enabled (--no-dev --minify)
echo.
echo ========================================
echo READY! Now press 'a' to build fresh APK
echo ========================================
echo.
call npx expo start --clear --no-dev --minify
pause
