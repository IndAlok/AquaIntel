# 🤖 Android Studio Build Guide - AquaIntel

This guide covers building AquaIntel using Android Studio for native Android development.

## 📋 Prerequisites

1. **Android Studio** (Latest version - Arctic Fox or newer)
2. **JDK 17** (Required for React Native 0.73)
3. **Node.js** 18+ with npm
4. **Android SDK** with the following components:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Platform-Tools
   - Android Emulator (optional, for testing)

## 🔧 Setup Steps

### 1. Install Dependencies

First, install all npm packages including the newly added `expo-build-properties`:

```bash
npm install
```

### 2. Prebuild Android Project

Generate the native Android project files:

```bash
npx expo prebuild --platform android
```

This will create an `android/` directory with the complete Android Studio project.

### 3. Configure Android SDK

Ensure your `ANDROID_HOME` environment variable is set:

**Windows (PowerShell):**
```powershell
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH = "$env:PATH;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
```

**Add permanently:**
```powershell
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\Admin\AppData\Local\Android\Sdk', 'User')
```

### 4. Open in Android Studio

1. Open Android Studio
2. Click **File → Open**
3. Navigate to `C:\Users\Admin\Desktop\AquaIntel\android`
4. Click **OK**

Android Studio will:
- Sync Gradle files
- Download dependencies
- Index the project

### 5. Configure Google Maps API Key

For the Maps feature, you need a Google Maps API key:

1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Create `android/app/src/main/res/values/keys.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="google_maps_api_key">YOUR_API_KEY_HERE</string>
</resources>
```

3. Update `android/app/src/main/AndroidManifest.xml` to include:

```xml
<application>
    <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="@string/google_maps_api_key"/>
</application>
```

### 6. Build Variants

Android Studio supports multiple build variants:

- **debug**: Development build with debugging enabled
- **release**: Production build with optimizations

Select the variant in Android Studio:
**Build → Select Build Variant**

## 🏗️ Building the APK

### Debug Build

**Option 1: Using Android Studio**
1. Click **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. APK will be in: `android/app/build/outputs/apk/debug/`

**Option 2: Using Command Line**
```bash
cd android
./gradlew assembleDebug
```

### Release Build

**Option 1: Using Android Studio**
1. Click **Build → Generate Signed Bundle / APK**
2. Select **APK** → Next
3. Create or select keystore
4. Fill in keystore details
5. Select **release** build variant
6. Click **Finish**

**Option 2: Using Command Line**
```bash
cd android
./gradlew assembleRelease
```

## 🔑 Signing Configuration (for Release)

### 1. Generate Keystore

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore aquaintel-release.keystore -alias aquaintel-key -keyalg RSA -keysize 2048 -validity 10000
```

**Save this information securely:**
- Keystore password
- Key alias
- Key password

### 2. Configure Gradle Signing

Create `android/gradle.properties` (add to .gitignore):

```properties
AQUAINTEL_UPLOAD_STORE_FILE=aquaintel-release.keystore
AQUAINTEL_UPLOAD_KEY_ALIAS=aquaintel-key
AQUAINTEL_UPLOAD_STORE_PASSWORD=your_keystore_password
AQUAINTEL_UPLOAD_KEY_PASSWORD=your_key_password
```

### 3. Update build.gradle

The signing configuration should be in `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('AQUAINTEL_UPLOAD_STORE_FILE')) {
                storeFile file(AQUAINTEL_UPLOAD_STORE_FILE)
                storePassword AQUAINTEL_UPLOAD_STORE_PASSWORD
                keyAlias AQUAINTEL_UPLOAD_KEY_ALIAS
                keyPassword AQUAINTEL_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

## 🚀 Running on Device/Emulator

### Using Android Studio

1. **Create/Start Emulator:**
   - Tools → Device Manager
   - Create new virtual device or start existing

2. **Run App:**
   - Click the green **Run** button (▶)
   - Or press **Shift + F10**

### Using Command Line

**Start Metro bundler:**
```bash
npm start
```

**In another terminal, run Android:**
```bash
npx expo run:android
```

Or directly:
```bash
cd android
./gradlew installDebug
adb shell am start -n com.aquaintel.app/.MainActivity
```

## 🔍 Debugging

### Logcat (Android Studio)

View logs in Android Studio:
- **View → Tool Windows → Logcat**
- Filter by package: `com.aquaintel.app`

### React Native Debugger

1. Shake device or **Ctrl + M** (emulator)
2. Select "Debug" from menu
3. Chrome DevTools will open at `localhost:19000`

### Performance Profiling

1. **Build → Analyze APK**
2. **Run → Profile 'app'**
3. Use Android Profiler for CPU, Memory, Network analysis

## 📦 Build Output Locations

After building, find your APKs/AABs here:

**Debug APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Release APK:**
```
android/app/build/outputs/apk/release/app-release.apk
```

**Release AAB (for Play Store):**
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 🐛 Common Issues

### Issue: Gradle Build Failed

**Solution:**
```bash
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

### Issue: SDK Not Found

**Solution:**
Set ANDROID_HOME correctly and ensure SDK components are installed.

### Issue: Out of Memory

**Solution:**
Increase Gradle memory in `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

### Issue: Maps Not Showing

**Solution:**
- Verify Google Maps API key is correct
- Enable "Maps SDK for Android" in Google Cloud Console
- Check AndroidManifest.xml has the meta-data

## 🎯 Build Configuration Summary

Current build configuration (from `app.json`):

```json
{
  "compileSdkVersion": 34,
  "targetSdkVersion": 34,
  "minSdkVersion": 23,
  "buildToolsVersion": "34.0.0",
  "enableHermes": true,
  "enableProguardInReleaseBuilds": true
}
```

**What this means:**
- **minSdkVersion 23**: Supports Android 6.0 (Marshmallow) and above (~94% of devices)
- **targetSdkVersion 34**: Optimized for Android 14
- **Hermes**: Facebook's optimized JavaScript engine (faster startup, smaller APK)
- **Proguard**: Code minification and obfuscation for release builds

## 📊 APK Size Optimization

To reduce APK size:

1. **Enable App Bundle** (AAB instead of APK):
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

2. **Enable splits** in `android/app/build.gradle`:
   ```gradle
   android {
       splits {
           abi {
               enable true
               reset()
               include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
               universalApk false
           }
       }
   }
   ```

3. **Remove unused resources:**
   Already configured with Proguard in release builds.

## 🔄 Continuous Integration

For automated builds, see `.github/workflows/ci.yml` which includes:
- Automated testing
- Build verification
- APK generation on every push

## 📞 Support

For build issues:
- Check Android Studio Build Output
- Review Logcat for runtime errors
- See SETUP_GUIDE.md for general setup
- Open issue on GitHub

---

**Happy Building! 🚀**
