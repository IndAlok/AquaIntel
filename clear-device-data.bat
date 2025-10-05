@echo off
echo ========================================
echo Clear Android App Data
echo ========================================
echo.
echo Clearing app data for com.aquaintel.app...
adb shell pm clear com.aquaintel.app
echo.
echo Done! Now reload the app or press 'a' in Metro terminal.
echo.
pause
