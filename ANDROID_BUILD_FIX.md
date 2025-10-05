# 🔧 Android Build Fix - minSdkVersion Updated

## ❌ **Problem**
Android build was failing with this error:
```
User has minSdkVersion 23 but library was built for 24 [//ReactAndroid/hermestooling]
```

**Affected Libraries**:
- `react-native-worklets`
- `expo-modules-core`
- `react-native-screens`

All these libraries require Hermes tooling which was built for **minSdk 24**, but the app was configured with **minSdk 23**.

---

## ✅ **Solution Applied**

### Changed in `app.json`:
```diff
"android": {
  "compileSdkVersion": 34,
  "targetSdkVersion": 34,
- "minSdkVersion": 23,
+ "minSdkVersion": 24,
  "buildToolsVersion": "34.0.0",
  ...
}
```

---

## 📱 **Impact**

### Device Compatibility:
- **Before**: Android 6.0 (Marshmallow, API 23) and above
- **After**: Android 7.0 (Nougat, API 24) and above

### Market Coverage:
- **Android 7.0+ (API 24+)**: ~95% of active Android devices (as of 2024)
- **Android 6.0 (API 23)**: ~2-3% of devices

**This is a GOOD change** - Android 6.0 is from 2015 and very few devices still use it. Most modern apps target API 24+.

---

## 🚀 **Next Steps**

1. **Commit this change** to your repository
2. **Push to the EAS build server**:
   ```bash
   git add app.json
   git commit -m "fix: Update minSdkVersion to 24 for Hermes compatibility"
   git push
   ```
3. **Trigger a new EAS build**:
   ```bash
   eas build --platform android --profile production
   ```

The build should now succeed! 🎉

---

## 📋 **Build Configuration Summary**

Your current Android build settings:
- **compileSdkVersion**: 34 (Android 14)
- **targetSdkVersion**: 34 (Android 14)
- **minSdkVersion**: 24 (Android 7.0) ✅ FIXED
- **buildToolsVersion**: 34.0.0
- **Hermes**: Enabled ✅
- **ProGuard**: Enabled for release builds ✅

---

## ℹ️ **Why This Happened**

React Native 0.81.4 (which comes with Expo SDK 54) uses Hermes as the default JavaScript engine. Hermes's native tooling (`hermestooling`) has certain native dependencies that require API level 24 minimum.

This is a **known requirement** for React Native with Hermes enabled, and most modern React Native apps use minSdk 24 or higher.

---

## ✅ **Verification**

After fixing, the build logs show:
```
[ExpoRootProject] Using the following versions:
  - minSdk:      24  ✅
  - compileSdk:  34  ✅
  - targetSdk:   34  ✅
```

The build should now proceed past the CMake configuration phase without errors!
