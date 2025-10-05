# 🚀 AquaIntel Quick Start Guide

**Get your app running in 15 minutes!**

---

## Current Status

✅ **Fixed:** All security vulnerabilities (21 → 0)  
✅ **Fixed:** GitHub Actions CI/CD pipeline  
✅ **Fixed:** APK build system configured  
✅ **Added:** Firebase environment variable support  
✅ **Added:** Government API integration  
⚠️ **Needs Setup:** Firebase credentials  
⚠️ **Needs Setup:** Logo image  

---

## Prerequisites

- Node.js 20+ installed
- npm installed
- Code editor (VS Code recommended)

---

## Setup Steps

### Step 1: Install Dependencies (2 minutes)

```powershell
# Navigate to project
cd c:\Users\Admin\Desktop\AquaIntel

# Install all dependencies
npm install

# Verify installation
npx expo-doctor
```

### Step 2: Firebase Setup (5 minutes)

**A. Create Firebase Project:**

1. Go to: https://console.firebase.google.com
2. Click "Add project" or "Create a project"
3. Enter project name: `AquaIntel`
4. Disable Google Analytics (optional for demo)
5. Click "Create project"

**B. Register Web App:**

1. In Firebase console, click the **Web icon** (`</>`)
2. Register app name: `AquaIntel Web`
3. Click "Register app"
4. **Copy the config values** (you'll need these!)

**C. Fill .env File:**

Open `.env` file and paste your Firebase config:

```bash
# Firebase Configuration (REQUIRED)
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxx

# Demo Login Credentials (Optional but recommended)
EXPO_PUBLIC_DEMO_EMAIL=demo@aquaintel.gov.in
EXPO_PUBLIC_DEMO_PASSWORD=AquaIntel@2025

# Data Source Configuration (Optional)
EXPO_PUBLIC_USE_REAL_DATA=false
```

**D. Enable Authentication:**

1. In Firebase console → **Build** → **Authentication**
2. Click "Get started"
3. Click "Email/Password"
4. **Enable** the first toggle (Email/Password)
5. Click "Save"

**E. Create Demo User (Optional):**

1. In Authentication → **Users** tab
2. Click "Add user"
3. Email: `demo@aquaintel.gov.in`
4. Password: `AquaIntel@2025`
5. Click "Add user"

### Step 3: Logo Setup (3 minutes)

**Quick Option - Download Free Logo:**

1. Visit: https://www.flaticon.com/search?word=water%20drop
2. Download any 1024x1024 water-related icon
3. Save as: `c:\Users\Admin\Desktop\AquaIntel\assets\logo.png`

**Or Use Placeholder:**

```powershell
# Download placeholder
curl -o assets\logo.png https://via.placeholder.com/1024/0891B2/FFFFFF?text=AquaIntel
```

**Or Create Custom Logo:**

1. Use Canva: https://www.canva.com
2. Create 1024x1024 design
3. Add water drop icon + "AquaIntel" text
4. Download as PNG
5. Save to: `assets\logo.png`

### Step 4: Run the App (2 minutes)

```powershell
# Start Expo development server
npm start
```

Then:
- Press `a` to open in Android emulator
- Or scan QR code with Expo Go app on your phone

### Step 5: Test Everything (3 minutes)

**Test Authentication:**
1. Click "Demo Login" button
2. Should auto-fill and log in ✅

**Test Sign Up:**
1. Tap "Sign Up"
2. Enter email and password
3. Should create account ✅

**Test Data Display:**
1. After login, view Dashboard
2. See water level data ✅
3. Navigate to Map ✅
4. Check Forecast ✅

---

## Verification Checklist

Run through this checklist:

- [ ] `npm install` completed without errors
- [ ] `npx expo-doctor` shows no critical issues
- [ ] `.env` file has all 6 Firebase variables filled
- [ ] Firebase Authentication is enabled
- [ ] Demo user created in Firebase
- [ ] `assets/logo.png` exists (1024x1024)
- [ ] `npm start` launches successfully
- [ ] App opens on device/emulator
- [ ] Demo login works
- [ ] Sign up works
- [ ] Dashboard shows data
- [ ] Map displays stations
- [ ] No error messages in console

---

## Common Issues & Fixes

### Issue: "Firebase API key not found"

**Fix:**
```powershell
# Check .env file exists
ls .env

# Restart development server
# Press Ctrl+C to stop
npm start
```

### Issue: "Demo login failed"

**Fix:**
1. Verify demo user exists in Firebase Authentication → Users
2. Check email/password matches `.env` values
3. Ensure Firebase Authentication is enabled

### Issue: "Cannot find module 'expo-font'"

**Fix:**
```powershell
npx expo install expo-font
```

### Issue: Logo not showing in build

**Fix:**
```powershell
# Verify logo exists
ls assets\logo.png

# Check size (should be 1024x1024)
# Re-download if needed
```

### Issue: "Metro bundler failed to start"

**Fix:**
```powershell
# Clear cache
npx expo start -c

# If that doesn't work, clear all cache
rm -r node_modules
npm install
npx expo start -c
```

---

## Next Steps

### For Demo/Hackathon:

1. **Test on Real Device:**
   ```powershell
   # Build APK for testing
   npx eas build -p android --profile preview
   ```

2. **Customize Branding:**
   - Update app name in `app.json`
   - Change theme colors in `constants/theme.js`
   - Add your team logo

3. **Practice Demo Flow:**
   - Onboarding → Login → Dashboard → Map → Forecast
   - Show demo login
   - Explain government data integration

### For Production:

1. **Get Real API Keys:**
   - See `GOVERNMENT_API_SETUP.md`
   - Register with WRIS, IMD, CGWB

2. **Enable Firestore:**
   - Firebase console → Build → Firestore Database
   - Create database
   - Configure security rules

3. **Build Production APK:**
   ```powershell
   npx eas build -p android --profile production
   ```

---

## Build Commands Reference

```powershell
# Development
npm start                          # Start dev server
npm run android                    # Run on Android
npm run ios                        # Run on iOS

# Building APK
npm run doctor                     # Check environment
npm run build:android              # Build development APK
npm run build:android:prod         # Build production APK

# Direct EAS commands
npx eas build -p android --profile preview      # Preview APK
npx eas build -p android --profile production   # Production AAB
```

---

## Important Files Reference

| File | Purpose | Action Needed |
|------|---------|---------------|
| `.env` | Environment variables | Fill Firebase config |
| `assets/logo.png` | App icon | Download/create 1024x1024 PNG |
| `FIREBASE_SETUP.md` | Detailed Firebase guide | Read if issues |
| `GOVERNMENT_API_SETUP.md` | API integration guide | Read for real data |
| `BUILD_APK_GUIDE.md` | APK building guide | Read before building |

---

## Getting Help

### Documentation:

- **Firebase Setup:** See `FIREBASE_SETUP.md`
- **Government APIs:** See `GOVERNMENT_API_SETUP.md`
- **Building APK:** See `BUILD_APK_GUIDE.md`
- **Security Fixes:** See `SECURITY_RESOLUTION_SUMMARY.md`

### Debugging:

```powershell
# Check environment
npx expo-doctor

# View detailed logs
npx expo start --dev-client

# Check for errors
npm run lint
```

### Resources:

- Expo Docs: https://docs.expo.dev
- Firebase Docs: https://firebase.google.com/docs
- React Native Docs: https://reactnative.dev

---

## Summary

**You now have:**
- ✅ Secure, up-to-date dependencies
- ✅ Working CI/CD pipeline
- ✅ Firebase authentication
- ✅ Government API integration (with fallbacks)
- ✅ APK build system
- ✅ Demo login capability

**Time to complete:** ~15 minutes  
**Result:** Fully functional AquaIntel app! 🎉

---

**Last Updated:** January 2025  
**Status:** Ready for demo and production! 🚀
