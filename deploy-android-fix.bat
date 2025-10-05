@echo off
REM Quick deployment script for Android build fix (Windows)

echo ================================================
echo 🔧 AquaIntel - Android Build Fix Deployment
echo ================================================
echo.

REM Step 1: Commit the fix
echo 📝 Step 1: Committing the minSdkVersion fix...
git add app.json
git commit -m "fix: Update minSdkVersion from 23 to 24 for Hermes compatibility - Fixes Android build failure with react-native-worklets, expo-modules-core, and react-native-screens - React Native Hermes tooling requires minimum API 24 - Maintains compatibility with 95%+ of active Android devices (Android 7.0+)"

echo ✅ Commit created!
echo.

REM Step 2: Push to remote
echo ⬆️  Step 2: Pushing to GitHub...
git push origin main

echo ✅ Pushed to remote!
echo.

REM Step 3: Trigger EAS build
echo 🏗️  Step 3: Triggering EAS build for Android...
echo Run this command manually:
echo.
echo   eas build --platform android --profile production
echo.
echo Or for preview build:
echo   eas build --platform android --profile preview
echo.
echo ================================================
echo ✅ Deployment script complete!
echo ================================================
pause
