@echo off
echo ========================================
echo Build APK with NO CACHE - arm64-v8a ONLY
echo ========================================
echo.
echo This will build a completely fresh APK:
echo - No cache enabled
echo - Clean build
echo - ARM64-v8a architecture only
echo - Optimized for size and speed
echo.
pause
echo.

echo [1/3] Clearing local caches...
if exist android\app\build rmdir /s /q android\app\build
if exist android\build rmdir /s /q android\build
if exist android\.gradle rmdir /s /q android\.gradle
echo Done.
echo.

echo [2/3] Building with EAS (no-cache profile)...
echo.
call eas build --platform android --profile preview-no-cache
echo.

echo [3/3] Build submitted!
echo.
echo ========================================
echo Check your EAS dashboard for build status
echo ========================================
pause
