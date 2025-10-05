# 📊 Firebase Analytics & Crashlytics Setup Guide

## Overview

This guide will help you integrate Firebase Analytics and Crashlytics into your AquaIntel APK.

**What You'll Get:**
- 📊 **Analytics**: Track user behavior, screen views, events
- 🔥 **Crashlytics**: Real-time crash reporting and debugging
- 📈 **Insights**: User engagement, retention, popular features

---

## Prerequisites

✅ **Already Done:**
- Firebase project created (`aquaintel00`)
- Web app registered
- Firebase credentials in `.env`
- React Native Firebase packages installed

⚠️ **Still Needed:**
- Register Android app in Firebase
- Download `google-services.json`
- Enable Analytics & Crashlytics
- Rebuild APK

---

## Step 1: Register Android App in Firebase

### A. Go to Firebase Console
https://console.firebase.google.com → Select **aquaintel00**

### B. Add Android App
1. Click the **Android icon** (⚙️ Settings → Project settings → Your apps)
2. Click **"Add app"** → Select **Android**
3. Fill in details:
   ```
   Android package name: com.aquaintel.app
   App nickname: AquaIntel Android
   Debug signing certificate SHA-1: (optional for now)
   ```
4. Click **"Register app"**

### C. Download google-services.json
1. Click **"Download google-services.json"**
2. Save it to your project root:
   ```
   c:\Users\Admin\Desktop\AquaIntel\google-services.json
   ```

**CRITICAL:** The file MUST be named exactly `google-services.json`

---

## Step 2: Verify google-services.json Location

```powershell
# Check if file exists
ls google-services.json

# Expected output:
# google-services.json
```

**File should be in the same directory as:**
- `package.json`
- `app.json`
- `app.config.js`

---

## Step 3: Enable Analytics in Firebase

### A. Enable Google Analytics
1. In Firebase Console → **Project Settings**
2. Scroll to **Google Analytics**
3. If not enabled, click **"Enable Google Analytics"**
4. Select or create Analytics account
5. Click **"Enable Analytics"**

### B. Verify Analytics Data Collection
1. Go to **Analytics** → **Dashboard**
2. Should show "Collecting data..."

---

## Step 4: Enable Crashlytics in Firebase

### A. Enable Crashlytics
1. In Firebase Console → **Build** → **Crashlytics**
2. Click **"Get started"**
3. Follow the setup wizard
4. Click **"Enable Crashlytics"**

### B. Configure Crashlytics
1. Make sure **"Enable Crashlytics NDK reporting"** is ON
2. Click **"Finish setup"**

---

## Step 5: Update .env File

Your `.env` should now have:

```bash
# Firebase Web Config (already there)
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel00.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel00
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel00.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=833538659407
EXPO_PUBLIC_FIREBASE_APP_ID=1:833538659407:web:881696ee6955406938863a

# Demo Login
EXPO_PUBLIC_DEMO_EMAIL=demo@aquaintel.gov.in
EXPO_PUBLIC_DEMO_PASSWORD=AquaIntel@2025

# Government API Keys (optional)
EXPO_PUBLIC_WRIS_API_KEY=
EXPO_PUBLIC_NWIC_API_KEY=
EXPO_PUBLIC_IMD_API_KEY=

# App Settings
EXPO_PUBLIC_USE_REAL_DATA=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=true

# Firebase Native SDK (NEW - add this!)
GOOGLE_SERVICES_JSON=./google-services.json
```

---

## Step 6: Verify app.config.js

The `app.config.js` file has been updated with:

```javascript
plugins: [
  // ... other plugins
  "@react-native-firebase/app",
  "@react-native-firebase/analytics",
  "@react-native-firebase/crashlytics"
],
android: {
  // ...
  googleServicesFile: process.env.GOOGLE_SERVICES_JSON
}
```

✅ **Already configured!**

---

## Step 7: Rebuild APK with Analytics & Crashlytics

### Important: Clean Build Required

Since we've added native Firebase SDKs, you need a fresh build:

```powershell
# Build with Analytics & Crashlytics
npx eas build -p android --profile preview --clear-cache
```

**What happens during build:**
1. ✅ Reads `.env` file
2. ✅ Includes `google-services.json`
3. ✅ Bundles Firebase Analytics & Crashlytics
4. ✅ Configures native Android modules
5. ✅ Creates APK with crash reporting

**Build time:** ~15-20 minutes (includes native modules)

---

## Step 8: Test Analytics & Crashlytics

### After installing the new APK:

### A. Test Analytics
1. Open the app
2. Navigate through screens:
   - Dashboard → Map → Forecast
3. Login/Signup
4. View station details

**Check Firebase Console:**
- **Analytics** → **Events**
- Should see events within 24 hours (realtime debug events appear faster)

### B. Test Crashlytics
1. Add this to a button temporarily:
   ```javascript
   import { testCrash } from '../services/firebaseAnalytics';
   
   // In button onPress:
   onPress={() => testCrash()}  // This will crash the app!
   ```

2. Press the button
3. App crashes ✅
4. Reopen app
5. Check **Crashlytics** → **Dashboard** in Firebase (takes ~5 minutes)

**Don't forget to remove the test crash button!**

---

## Using Analytics in Your App

### Import the service:
```javascript
import { AnalyticsEvents, logScreenView, logEvent } from '../services/firebaseAnalytics';
```

### Log screen views:
```javascript
// In useEffect of each screen
import { useEffect } from 'react';
import { logScreenView } from '../services/firebaseAnalytics';

function DashboardScreen() {
  useEffect(() => {
    logScreenView('Dashboard');
  }, []);
  
  return (
    // ... your screen
  );
}
```

### Log events:
```javascript
import { AnalyticsEvents } from '../services/firebaseAnalytics';

// When user logs in
AnalyticsEvents.LOGIN('email');

// When user views a station
AnalyticsEvents.VIEW_STATION_DETAIL(stationId);

// Custom event
logEvent('custom_action', { param1: 'value1' });
```

### Log errors:
```javascript
import { logError } from '../services/firebaseAnalytics';

try {
  // Some code that might fail
  await fetchData();
} catch (error) {
  logError(error, { screen: 'Dashboard', action: 'fetchData' });
}
```

---

## Step 9: Enable Debug Mode (Optional)

To see Analytics events in realtime during testing:

### Enable Debug Mode on Your Device:

```powershell
# Enable
adb shell setprop debug.firebase.analytics.app com.aquaintel.app

# Disable
adb shell setprop debug.firebase.analytics.app .none.
```

Then check **Analytics** → **DebugView** in Firebase Console.

---

## What You'll See in Firebase Console

### Analytics Dashboard:
- 👥 **Active Users**: Real-time and daily
- 📱 **Screen Views**: Most viewed screens
- 🎯 **Events**: All tracked events
- 🌍 **Geography**: User locations
- 📊 **Engagement**: Session duration, retention

### Crashlytics Dashboard:
- 🔥 **Crashes**: All app crashes
- 📈 **Crash-free Users**: Percentage
- 🐛 **Issues**: Grouped crash reports
- 📱 **Affected Devices**: Device models and OS versions
- 🔍 **Stack Traces**: Detailed crash information

---

## Troubleshooting

### Issue: "google-services.json not found"

**Fix:**
```powershell
# Verify file location
ls google-services.json

# Should be in project root, not in subdirectory
```

### Issue: Analytics not showing data

**Possible causes:**
1. **Wait 24 hours** - Analytics has a delay
2. Enable **DebugView** (see Step 9)
3. Check app is installed from the APK you built
4. Verify `google-services.json` matches your Firebase project

### Issue: Crashlytics not reporting

**Possible causes:**
1. **Wait 5-10 minutes** after first crash
2. App must be **reopened** after crash for report to upload
3. Verify Crashlytics is enabled in Firebase Console
4. Check internet connection on device

### Issue: Build fails with "google-services.json" error

**Fix:**
```bash
# Make sure file exists
ls google-services.json

# Verify .env has correct path
GOOGLE_SERVICES_JSON=./google-services.json
```

---

## Common Analytics Events

Already implemented in `services/firebaseAnalytics.js`:

| Event | Description | Parameters |
|-------|-------------|------------|
| `login` | User logged in | `method` (email/demo) |
| `sign_up` | New user registered | `method` (email) |
| `screen_view` | Screen opened | `screen_name`, `screen_class` |
| `view_station` | Station details viewed | `station_id` |
| `fetch_water_data` | Water data requested | `source` (API/mock) |
| `search` | User searched | `search_term` |
| `share` | Content shared | `content_type` |

---

## Security & Privacy

### Analytics Data Collection:
- ✅ Anonymous by default
- ✅ Aggregated insights
- ✅ No personal data (unless you log it)
- ✅ GDPR compliant (if configured correctly)

### Crashlytics Data:
- ✅ Device info (model, OS, version)
- ✅ Stack traces
- ✅ Custom attributes you set
- ⚠️ Remove sensitive data before logging

### Best Practices:
```javascript
// ❌ DON'T log sensitive data
logEvent('user_action', { email: user.email });  // Bad!

// ✅ DO use anonymous identifiers
logEvent('user_action', { user_id: user.id });   // Good!
```

---

## Quick Command Reference

```powershell
# Download google-services.json
# (Manual: Firebase Console → Project Settings → Android app)

# Rebuild APK with Analytics
npx eas build -p android --profile preview --clear-cache

# Enable debug mode
adb shell setprop debug.firebase.analytics.app com.aquaintel.app

# Check logcat for Firebase logs
adb logcat -s FA FA-SVC
```

---

## Summary Checklist

- [ ] Register Android app in Firebase
- [ ] Download `google-services.json` to project root
- [ ] Enable Google Analytics in Firebase
- [ ] Enable Crashlytics in Firebase
- [ ] Verify `google-services.json` location
- [ ] Verify `.env` has `GOOGLE_SERVICES_JSON=./google-services.json`
- [ ] Rebuild APK: `npx eas build -p android --profile preview --clear-cache`
- [ ] Install new APK on device
- [ ] Test app and check Firebase Console (wait 24h for Analytics)
- [ ] Test crash reporting (optional)
- [ ] Remove test crash code

---

## Next Steps

1. **Download `google-services.json`** from Firebase
2. **Place it in project root** (same folder as `package.json`)
3. **Rebuild APK**:
   ```powershell
   npx eas build -p android --profile preview --clear-cache
   ```
4. **Install and test**
5. **Check Firebase Console** after 24 hours

---

**Last Updated:** October 5, 2025  
**Status:** Ready to add Analytics & Crashlytics! 📊🔥
