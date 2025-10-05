# 🔄 Rebuild APK with Environment Variables

## ⚠️ Critical Issue: Environment Variables Are Bundled at Build Time

**The Problem:**
- You built the APK **before** filling in the `.env` file
- Environment variables are **bundled into the APK during build**
- The installed APK has **empty Firebase credentials** hardcoded into it
- Updating `.env` on your PC **doesn't affect the already-built APK**

**The Solution:**
- Fill in `.env` file with Firebase credentials
- **Rebuild the APK** - this bundles the new env vars
- Install the new APK on your device

---

## How Environment Variables Work in React Native/Expo

### Build Time vs Runtime:

```
┌─────────────────────────────────────────┐
│ BUILD TIME (when creating APK)          │
├─────────────────────────────────────────┤
│ 1. EAS/Metro reads .env file            │
│ 2. Replaces process.env.EXPO_PUBLIC_*   │
│ 3. Bundles hardcoded values into APK    │
│ 4. Creates APK with values BAKED IN     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ RUNTIME (when app runs on device)       │
├─────────────────────────────────────────┤
│ APK uses the values bundled during build│
│ .env file on PC is NOT accessed         │
│ Changing .env does NOT affect APK       │
└─────────────────────────────────────────┘
```

**Key Point:** `.env` values are compiled into the APK, not loaded at runtime!

---

## Step-by-Step: Rebuild APK with Firebase Config

### Step 1: Verify `.env` is Filled (Already Done ✅)

Check your `.env` file:
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel00.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel00
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel00.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=833538659407
EXPO_PUBLIC_FIREBASE_APP_ID=1:833538659407:web:881696ee6955406938863a
```

✅ **Your `.env` is complete!** Now rebuild.

### Step 2: Ensure You Have `assets/logo.png`

Check if logo exists:
```powershell
ls assets\logo.png
```

**If missing, create it:**

**Quick Option - Download placeholder:**
```powershell
# PowerShell
Invoke-WebRequest -Uri "https://via.placeholder.com/1024/0891B2/FFFFFF?text=AquaIntel" -OutFile "assets\logo.png"
```

**Or download from:**
- Flaticon: https://www.flaticon.com/search?word=water%20drop
- Save as 1024x1024 PNG to `assets\logo.png`

### Step 3: Login to EAS (One Time Setup)

```powershell
npx eas login
```

**Or create account:**
```powershell
npx eas register
```

### Step 4: Configure EAS (If First Time)

```powershell
npx eas build:configure
```

This creates/updates `eas.json` (already done in your project ✅)

### Step 5: Build APK with Environment Variables

**Option A: Preview Build (Recommended for Testing)**
```powershell
npx eas build -p android --profile preview
```

**What this does:**
1. ✅ Reads your `.env` file
2. ✅ Bundles Firebase credentials into APK
3. ✅ Creates installable APK
4. ✅ Uploads to EAS servers
5. ✅ Provides download link

**Option B: Production Build (For Play Store)**
```powershell
npx eas build -p android --profile production
```

Creates AAB file (Google Play Store format)

### Step 6: Wait for Build to Complete

**Build process:**
```
Building...
│ Bundling JavaScript
│ Including environment variables from .env ✅
│ Compiling Android app
│ Creating APK
└── Build complete!
```

**Time:** ~10-15 minutes (cloud build)

You'll get a **download link** when complete.

### Step 7: Download and Install New APK

1. **Download APK** from the link EAS provides
2. **Transfer to your Android device** (USB, email, cloud storage)
3. **Uninstall old APK** (the one with empty env vars)
   - Settings → Apps → AquaIntel → Uninstall
4. **Install new APK**
   - Open downloaded file
   - Allow installation from unknown sources if prompted

### Step 8: Test Firebase Connection

Open the app and check:
- ✅ No "Firebase configuration incomplete" error
- ✅ Login screen loads
- ✅ Can create account (sign up works)
- ✅ Demo login works (after creating demo user in Firebase)

---

## Alternative: Local Build (Faster, But Requires Android Studio)

If you want faster rebuilds and have Android Studio installed:

```powershell
# Install Android dependencies
npm install

# Build locally
npx eas build --platform android --profile preview --local
```

**Requirements:**
- Android Studio with SDK installed
- JDK 17+
- More setup complexity

**Benefit:** Build on your PC, instant APK creation

---

## Why Your Current APK Doesn't Work

Your current APK was built when `.env` looked like this:

```bash
# Empty values - what was bundled into your APK
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
# ... all empty
```

The APK has this **hardcoded** into it:
```javascript
const firebaseConfig = {
  apiKey: undefined,      // ❌ Empty!
  authDomain: undefined,  // ❌ Empty!
  projectId: undefined,   // ❌ Empty!
  // ...
};
```

No amount of updating `.env` on your PC will fix the already-built APK!

---

## Quick Rebuild Command

**One command to rebuild everything:**

```powershell
npx eas build -p android --profile preview
```

**This will:**
1. Read current `.env` (with your Firebase config) ✅
2. Bundle env vars into APK ✅
3. Create new APK with working Firebase ✅
4. Upload and provide download link ✅

---

## Using EAS Build Secrets (Advanced)

For production apps, you can store env vars in EAS secrets:

```powershell
# Store Firebase config as secret
npx eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_API_KEY --value "AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4"
```

Then remove `.env` file (more secure).

But for hackathon/demo, using `.env` file is fine!

---

## Common Questions

### Q: Can I just update the APK without rebuilding?
**A:** No. Environment variables are compiled in. Must rebuild.

### Q: How long does EAS build take?
**A:** ~10-15 minutes (cloud build is free on Expo)

### Q: Do I need to rebuild every time I change .env?
**A:** Yes, if you want those changes in the APK.

### Q: Can I test without rebuilding?
**A:** Yes! Use Expo Go:
```powershell
npx expo start
# Press 'a' to open in Expo Go app
```
This uses **development mode** and loads `.env` dynamically.

### Q: What's the difference between Expo Go and APK?
**Expo Go:** Development mode, loads .env at runtime  
**APK:** Production mode, .env bundled at build time

---

## Recommended Workflow

### For Development (Fast Testing):
```powershell
# Start dev server
npx expo start

# Opens in Expo Go app
# Reads .env dynamically
# Fast refresh on code changes
```

### For Demo/Production (Real APK):
```powershell
# Build APK with env vars
npx eas build -p android --profile preview

# Download and install
# Env vars are bundled
# Standalone app
```

---

## Your Next Steps

1. **Make sure `assets/logo.png` exists** (1024x1024)
2. **Verify `.env` has all Firebase values** (already done ✅)
3. **Run rebuild command:**
   ```powershell
   npx eas build -p android --profile preview
   ```
4. **Wait ~10-15 minutes** for build to complete
5. **Download new APK** from provided link
6. **Uninstall old APK** from device
7. **Install new APK** with Firebase config
8. **Test authentication** - should work now! ✅

---

## Enable Firebase Authentication First!

Before the new APK will work, enable Email/Password auth:

1. Go to https://console.firebase.google.com
2. Select project: **aquaintel00**
3. **Build** → **Authentication** → **Get started**
4. Click **Email/Password**
5. **Enable** it
6. Click **Save**

Then create demo user (optional):
- Click **Users** tab → **Add user**
- Email: `demo@aquaintel.gov.in`
- Password: `AquaIntel@2025`

---

## Summary

**The Issue:**
- Old APK built with empty `.env` ❌
- Environment variables bundled at build time, not runtime
- Updating `.env` doesn't affect existing APK

**The Fix:**
```powershell
# Rebuild APK with filled .env
npx eas build -p android --profile preview
```

**Time Required:** 10-15 minutes  
**Result:** Working APK with Firebase credentials! 🎉

---

**Last Updated:** October 5, 2025  
**Status:** Ready to rebuild! 🚀
