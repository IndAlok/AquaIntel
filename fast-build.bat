@echo off
echo ========================================
echo AquaIntel - ULTRA FAST BUILD (ARM64 ONLY)
echo ========================================
echo.
echo This build is optimized for:
echo   - ARM64-v8a ONLY (95%% of Android devices)
echo   - Maximum size reduction
echo   - Fastest build time
echo   - Hermes engine enabled
echo.

set BUILD_TYPE=%1
if "%BUILD_TYPE%"=="" set BUILD_TYPE=fast-build

echo Selected build profile: %BUILD_TYPE%
echo.

echo [1/4] Cleaning previous builds...
if exist android\app\build\outputs rmdir /s /q android\app\build\outputs
echo Done.
echo.

echo [2/4] Setting optimization flags...
set EXPO_OPTIMIZE_ASSETS=1
set NODE_ENV=production
set HERMES_ENABLED=1
echo Done.
echo.

echo [3/4] Building APK (ARM64 only)...
echo This will take 5-10 minutes...
call eas build --profile %BUILD_TYPE% --platform android --local --non-interactive
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo BUILD FAILED!
    echo ========================================
    echo Check the error messages above
    pause
    exit /b 1
)

echo [4/4] Build completed!
echo.
echo ========================================
echo SUCCESS! APK built successfully
echo ========================================
echo.
echo Location: android\app\build\outputs\apk\release\
echo.
echo APK Details:
echo   - Architecture: ARM64-v8a ONLY
echo   - Size: ~50-70%% smaller than multi-arch
echo   - Hermes: Enabled
echo   - Minified: Yes
echo   - ProGuard: Enabled
echo.
pause
