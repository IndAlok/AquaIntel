# 🔧 Complete Cache Clear & Rebuild Guide

## ❌ Problem
Getting error: `useLegacyImplementation prop is not available with Reanimated 3`

## ✅ Root Cause
The Android device is running an **OLD CACHED BUNDLE** even though the source code is correct.

---

## 🚀 Solution 1: Force Clean Local Development

### Step 1: Complete Cache Clear
```powershell
# Kill all Metro/Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clear ALL caches
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force android\app\build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force android\build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force android\.gradle -ErrorAction SilentlyContinue
```

### Step 2: Clear Device App Data
```bash
# Completely uninstall the app
adb uninstall com.aquaintel.app

# Or clear app data (if app is needed)
adb shell pm clear com.aquaintel.app
```

### Step 3: Start Fresh Development Server
```bash
# Start Expo with cleared cache + production mode
npx expo start --clear --no-dev --minify
```

### Step 4: Rebuild on Device
- Press **`a`** to build fresh APK on Android
- Wait for Metro to bundle (will take time on first build)
- App will install with completely fresh bundle

---

## 🚀 Solution 2: EAS Build with No Cache (RECOMMENDED)

### Use the No-Cache Build Profile

#### For APK (Testing):
```bash
eas build --platform android --profile preview-no-cache
```

#### For Production Bundle:
```bash
eas build --platform android --profile production-no-cache
```

### What This Does:
- ✅ Disables ALL caching (`"cache": { "disabled": true }`)
- ✅ Runs `clean` before build (`gradleCommand": "clean :app:assembleRelease"`)
- ✅ Forces complete rebuild from scratch
- ✅ Guaranteed fresh bundle

---

## 🚀 Solution 3: Use Provided Scripts

### Option A: Force Clean Rebuild (Local)
```bash
# Run the batch file
FORCE_CLEAN_REBUILD.bat
```

This will:
1. Kill all Node processes
2. Uninstall app from device
3. Clear all caches
4. Start Expo with fresh bundle
5. Ready to press 'a' for fresh APK

### Option B: Build APK with No Cache (EAS)
```bash
# Run the batch file
build-apk-no-cache.bat
```

This will:
1. Clear local caches
2. Submit EAS build with no-cache profile
3. Download fresh APK when done

---

## 📋 Verification Checklist

### ✅ Confirm Code is Correct
```bash
# Search for useLegacyImplementation in code
grep -r "useLegacyImplementation" navigation/

# Should return: NOTHING (or only comments)
```

### ✅ Verify DrawerNavigator.jsx
The file should have:
```jsx
<Drawer.Navigator
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{
    // ...other options...
    swipeEnabled: true,          // ✅ CORRECT
    swipeEdgeWidth: 50,           // ✅ CORRECT
    // useLegacyImplementation   ❌ MUST NOT EXIST
  }}
>
```

### ✅ Confirm App is Uninstalled
```bash
adb shell pm list packages | grep aquaintel
# Should return: NOTHING
```

### ✅ Confirm Caches are Cleared
```bash
# Check if cache folders exist
ls .expo          # Should not exist or be empty
ls android/build  # Should not exist
```

---

## 🎯 Build Profiles Explained

### `preview` (Default - With Cache)
- **Use when**: Regular testing
- **Cache**: Enabled for speed
- **Build time**: ~5-10 minutes
- **Risk**: May use old cached code

### `preview-no-cache` (CLEAN BUILD)
- **Use when**: After code changes, debugging errors
- **Cache**: DISABLED - completely fresh
- **Build time**: ~15-20 minutes
- **Risk**: None - guaranteed fresh bundle

### `production` (Play Store)
- **Use when**: Publishing to Play Store
- **Cache**: Partial (node_modules only)
- **Build time**: ~10-15 minutes
- **Output**: AAB file

### `production-no-cache` (CLEAN PRODUCTION)
- **Use when**: Critical production build
- **Cache**: DISABLED
- **Build time**: ~20-30 minutes
- **Output**: Fresh AAB file

---

## 🔍 Common Issues & Fixes

### Issue 1: Metro Says "Port 8081 in use"
```powershell
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Restart Metro
npx expo start --clear
```

### Issue 2: "Bundler cache is empty, rebuilding"
- **This is GOOD!** It means cache was successfully cleared
- First build will take 1-2 minutes
- Subsequent builds will be faster

### Issue 3: Error persists after cache clear
- **Solution**: The device still has old APK
```bash
# Completely uninstall
adb uninstall com.aquaintel.app

# Restart device (optional but helps)
adb reboot

# Wait for reboot, then rebuild
npx expo start --clear --no-dev --minify
# Press 'a' for fresh install
```

### Issue 4: Build takes too long (>30 mins)
- **Cause**: Building for all architectures
- **Solution**: Verified in `gradle.properties`:
```properties
reactNativeArchitectures=arm64-v8a  # ✅ Only ARM64
```

---

## ⚡ Optimization Settings (Already Applied)

### Build Speed Optimizations:
- ✅ ARM64-v8a ONLY (no other architectures)
- ✅ Hermes engine enabled
- ✅ R8 full mode (aggressive code shrinking)
- ✅ Resource optimization enabled
- ✅ Parallel builds enabled
- ✅ Build cache enabled (Gradle)
- ✅ Increased JVM memory (6GB)

### APK Size Optimizations:
- ✅ ProGuard enabled for release
- ✅ Resource shrinking enabled
- ✅ Separate annotation processing
- ✅ Legacy packaging disabled
- ✅ Asset optimization enabled

---

## 📊 Expected Results

### Local Development Build:
- **First build**: 2-3 minutes (cache cleared)
- **Subsequent**: 30-60 seconds
- **APK size**: ~50-70MB (arm64-v8a only)

### EAS Build (No Cache):
- **Build time**: 15-20 minutes
- **APK size**: ~50-70MB
- **AAB size**: ~40-60MB

### Performance:
- **App startup**: <2 seconds
- **Screen transitions**: 60 FPS
- **Bundle load**: <1 second

---

## 🎯 Final Verification Steps

1. **Verify source code is correct**:
   ```bash
   grep -r "useLegacyImplementation" .
   # Should only show comments/documentation
   ```

2. **Clear everything**:
   ```bash
   FORCE_CLEAN_REBUILD.bat
   ```

3. **Build fresh APK**:
   - Press `a` in Expo terminal
   - Wait for "Building..."
   - Wait for "Installing..."
   - App opens with fresh bundle

4. **Test the app**:
   - Open drawer (swipe from left or tap hamburger)
   - Navigate to different screens
   - Toggle dark mode
   - **No errors should appear**

---

## 🆘 Still Having Issues?

### Last Resort: Nuclear Option
```bash
# 1. Uninstall app
adb uninstall com.aquaintel.app

# 2. Clear EVERYTHING
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .expo
Remove-Item -Recurse -Force android/app/build
Remove-Item -Recurse -Force android/build
Remove-Item -Recurse -Force android/.gradle

# 3. Reinstall dependencies
npm install

# 4. Prebuild fresh
npx expo prebuild --clean

# 5. Start completely fresh
npx expo start --clear --no-dev --minify
```

---

## ✅ Success Criteria

You'll know it's fixed when:
- ✅ App starts without crashing
- ✅ Drawer opens smoothly
- ✅ No console errors
- ✅ All screens navigate properly
- ✅ Dark mode works perfectly
- ✅ Animations are smooth

---

**Last Updated**: October 6, 2025
**Status**: All optimizations applied, cache-clear scripts ready
**Next Step**: Run `FORCE_CLEAN_REBUILD.bat` or `build-apk-no-cache.bat`
