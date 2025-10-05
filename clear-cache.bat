@echo off
echo ========================================
echo AquaIntel - Complete Cache Clear
echo ========================================
echo.

echo [1/6] Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
echo Done.
echo.

echo [2/6] Clearing Android build cache...
if exist android\app\build rmdir /s /q android\app\build
if exist android\build rmdir /s /q android\build
if exist android\.gradle rmdir /s /q android\.gradle
echo Done.
echo.

echo [3/6] Clearing Expo and Metro cache...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache
call npx expo start --clear 2>nul
timeout /t 2 >nul
taskkill /F /IM node.exe 2>nul
echo Done.
echo.

echo [4/6] Clearing React Native cache...
call npx react-native start --reset-cache 2>nul
timeout /t 2 >nul
taskkill /F /IM node.exe 2>nul
echo Done.
echo.

echo [5/6] Clearing Watchman cache (if installed)...
watchman watch-del-all 2>nul
echo Done.
echo.

echo [6/6] Starting fresh development server...
echo.
echo ========================================
echo Cache cleared successfully!
echo ========================================
echo.
echo Starting Expo with clean cache...
call npx expo start -c
pause
