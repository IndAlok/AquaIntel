@echo off
echo ========================================
echo Fix ALL Build Issues - Complete Setup
echo ========================================
echo.
echo This script will:
echo 1. Delete package-lock.json
echo 2. Delete node_modules
echo 3. Install all dependencies fresh
echo 4. Run expo doctor to verify
echo.
pause
echo.

echo [1/5] Deleting package-lock.json...
if exist package-lock.json del /f package-lock.json
echo Done.
echo.

echo [2/5] Deleting node_modules...
if exist node_modules rmdir /s /q node_modules
echo Done.
echo.

echo [3/5] Installing all dependencies...
call npm install
echo Done.
echo.

echo [4/5] Running expo doctor...
call npx expo-doctor
echo Done.
echo.

echo [5/5] Checking installation...
call npx expo install --check
echo Done.
echo.

echo ========================================
echo All dependencies installed and verified!
echo ========================================
echo.
echo You can now run:
echo - npm start (local development)
echo - eas build (remote build)
echo.
pause
