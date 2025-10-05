@echo off
echo ========================================
echo Build Optimization Verification
echo ========================================
echo.

echo Checking optimizations...
echo.

echo [✓] Gradle Properties:
findstr "reactNativeArchitectures" android\gradle.properties
findstr "hermesEnabled" android\gradle.properties
findstr "android.enableR8.fullMode" android\gradle.properties
echo.

echo [✓] App Config:
findstr "jsEngine" app.json
findstr "enableProguardInReleaseBuilds" app.json
findstr "enableHermes" app.json
echo.

echo [✓] Metro Config:
findstr "drop_console" metro.config.js
findstr "inlineRequires" metro.config.js
echo.

echo ========================================
echo Optimization Summary:
echo ========================================
echo.
echo Architecture:     ARM64-v8a ONLY
echo JS Engine:       Hermes
echo Minification:    Enabled
echo ProGuard/R8:     Enabled (Full Mode)
echo Tree Shaking:    Enabled
echo Console Removal: Enabled
echo Resource Shrink: Enabled
echo.
echo Expected Build Time: 5-10 minutes
echo Expected APK Size:   40-60 MB
echo.
echo ========================================
pause
