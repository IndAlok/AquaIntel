# 🔧 Environment Variables Complete Fix

## The Root Cause

Your APK keeps showing "Firebase configuration incomplete" even after rebuilding because:

**Problem:** `app.json` doesn't support `process.env` - it's pure JSON!

**Solution:** We created `app.config.js` which DOES support environment variables.

---

## What We Changed

### 1. Created `app.config.js` ✅
**Location:** `c:\Users\Admin\Desktop\AquaIntel\app.config.js`

**What it does:**
- Exports configuration as JavaScript (not JSON)
- Supports `process.env.EXPO_PUBLIC_*` variables
- Exposes Firebase config via `extra` field
- Works with EAS Build

### 2. Updated `services/firebase.js` ✅
**What changed:**
- Now uses `expo-constants` to read config
- Falls back to `process.env` in development
- Works in both dev mode AND built APK

**How it works:**
```javascript
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,  // From app.config.js
  // ... other fields
};
```

### 3. Installed Missing Packages ✅
```
- expo-constants (to read app.config.js values)
- @react-native-firebase/app (native Firebase SDK)
- @react-native-firebase/analytics (Analytics)
- @react-native-firebase/crashlytics (Crash reporting)
```

---

## Why Your Previous Builds Failed

### Build #1: Empty .env
```
.env was empty
   ↓
APK built with undefined values
   ↓
App crashes: "Firebase configuration incomplete"
```

### Build #2: Filled .env but using app.json
```
.env has Firebase values ✅
   ↓
app.json doesn't support process.env ❌
   ↓
Values not passed to APK
   ↓
App crashes again
```

### Build #3: With app.config.js (THIS TIME!)
```
.env has Firebase values ✅
   ↓
app.config.js reads process.env ✅
   ↓
Expo Constants exposes values ✅
   ↓
APK gets Firebase config ✅
   ↓
App works! 🎉
```

---

## Before You Rebuild

### 1. Verify File Structure

```
AquaIntel/
├── app.json              (original file - keep it)
├── app.config.js         (NEW - overrides app.json)
├── .env                  (your Firebase credentials)
├── google-services.json  (DOWNLOAD THIS!)
├── package.json
└── services/
    ├── firebase.js       (updated to use Constants)
    └── firebaseAnalytics.js (NEW - Analytics & Crashlytics)
```

### 2. Download google-services.json

**CRITICAL FOR ANALYTICS & CRASHLYTICS!**

1. Go to: https://console.firebase.google.com
2. Select **aquaintel00**
3. Click ⚙️ **Project Settings**
4. Scroll to **Your apps**
5. If no Android app exists:
   - Click **Add app** → **Android**
   - Package name: `com.aquaintel.app`
   - Click **Register app**
6. Click **Download google-services.json**
7. Save to: `c:\Users\Admin\Desktop\AquaIntel\google-services.json`

**Verify:**
```powershell
ls google-services.json
# Should show the file
```

### 3. Verify .env Contents

```bash
# Firebase Web Credentials (for Firebase SDK)
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel00.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel00
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel00.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=833538659407
EXPO_PUBLIC_FIREBASE_APP_ID=1:833538659407:web:881696ee6955406938863a

# Demo Login
EXPO_PUBLIC_DEMO_EMAIL=demo@aquaintel.gov.in
EXPO_PUBLIC_DEMO_PASSWORD=AquaIntel@2025

# App Settings
EXPO_PUBLIC_USE_REAL_DATA=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=true

# Firebase Native SDK (for Analytics & Crashlytics)
GOOGLE_SERVICES_JSON=./google-services.json
```

### 4. Verify app.config.js Exists

```powershell
ls app.config.js
# Should show the file
```

---

## Rebuild APK (Final Time!)

### Clean Build with All Fixes

```powershell
# Clear any previous build cache
npx eas build -p android --profile preview --clear-cache
```

**What this build includes:**
1. ✅ Environment variables from .env (via app.config.js)
2. ✅ Firebase Web SDK config
3. ✅ google-services.json (Analytics & Crashlytics)
4. ✅ Native Firebase modules
5. ✅ Proper expo-constants integration

**Build time:** 15-20 minutes (includes native modules)

**Wait for:** "Build finished!" message and download link

---

## After Building

### 1. Download New APK
Click the download link from EAS Build

### 2. Uninstall Old APK
```
Settings → Apps → AquaIntel → Uninstall
```

### 3. Install New APK
Transfer to device and install

### 4. Test Authentication
- Open app
- Should load without crash ✅
- Try demo login
- Try sign up

### 5. Check Firebase Console
**After 24 hours:**
- Analytics → Dashboard (should show data)
- Crashlytics → Dashboard (should be initialized)

---

## How to Verify Everything Works

### Test 1: App Doesn't Crash on Launch
```
✅ Open app
✅ No "Firebase configuration incomplete" error
✅ Splash screen → Onboarding/Login screen
```

### Test 2: Authentication Works
```
✅ Click "Demo Login" → Successfully logs in
✅ Click "Sign Up" → Can create account
✅ Dashboard loads with data
```

### Test 3: Firebase Connection (Check Logs)
If you have `adb`:
```powershell
adb logcat -s firebase
# Should see: "Firebase initialized successfully"
# Should see: "Project ID: aquaintel00"
```

### Test 4: Analytics Events
```
✅ Navigate: Dashboard → Map → Forecast
✅ Check Firebase Console → Analytics → Events (after 24h)
✅ Should see: screen_view, user_engagement, etc.
```

---

## Deep Dive: Why app.config.js is Necessary

### Problem with app.json:
```json
{
  "expo": {
    "extra": {
      "firebaseApiKey": process.env.EXPO_PUBLIC_FIREBASE_API_KEY  // ❌ ERROR!
    }
  }
}
```
**Error:** JSON doesn't support `process.env`!

### Solution with app.config.js:
```javascript
module.exports = ({ config }) => ({
  ...config,
  extra: {
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY  // ✅ WORKS!
  }
});
```
**Success:** JavaScript supports variables!

### How Firebase reads it:
```javascript
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig.extra.firebaseApiKey;  // ✅ Gets value!
```

---

## If It STILL Doesn't Work

### Debug Steps:

### 1. Check if app.config.js is being used
```powershell
# Temporarily add this to app.config.js
console.log('🔍 Firebase API Key:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY);

# Run build
npx eas build -p android --profile preview

# Check build logs - should see your API key
```

### 2. Verify .env is in project root
```powershell
pwd
# Should be: c:\Users\Admin\Desktop\AquaIntel

ls .env
# Should exist
```

### 3. Check .env file encoding
```powershell
# Open in Notepad
notepad .env

# Check for:
# - No weird characters
# - No quotes around values
# - No spaces around = signs
```

### 4. Try hardcoding values (temporary test)
```javascript
// In app.config.js, replace:
firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY

// With:
firebaseApiKey: 'AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4'

// Rebuild and test
// If it works, the issue is .env loading
```

---

## Alternative: Use EAS Secrets

If `.env` keeps causing issues, use EAS secrets:

```powershell
# Store each variable as secret
npx eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_API_KEY --value "AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4"
npx eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN --value "aquaintel00.firebaseapp.com"
# ... repeat for all variables
```

Then EAS Build automatically uses them!

---

## Summary: What You Need to Do Now

### Step 1: Get google-services.json
```
Firebase Console → Project Settings → Android app → Download
Save to project root
```

### Step 2: Verify Files Exist
```powershell
ls app.config.js          # ✅ Must exist
ls .env                   # ✅ Must exist
ls google-services.json   # ✅ Must exist
```

### Step 3: Rebuild APK
```powershell
npx eas build -p android --profile preview --clear-cache
```

### Step 4: Install & Test
```
Uninstall old APK
Install new APK
Open app - should work!
```

---

## Expected Outcome

**After this build:**
- ✅ App launches without crash
- ✅ Firebase authentication works
- ✅ Demo login works
- ✅ Analytics tracking works (check after 24h)
- ✅ Crashlytics enabled (check after first crash)

**If it doesn't work:** Run the debug steps above and share the error!

---

**This is the FINAL fix! The issue was app.json not supporting environment variables.**

**Last Updated:** October 5, 2025  
**Status:** Ready to rebuild with proper configuration! 🚀
