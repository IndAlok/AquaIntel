# 🔥 Firebase Secrets Setup for EAS Build

## 🚨 **CRITICAL: Why Your App is Crashing**

Your app crashes on launch with:
```
Error: Firebase configuration incomplete. Rebuild the app after updating .env file.
```

**Root Cause**: EAS Build **cannot read your local `.env` file**. Environment variables must be added to **EAS Secrets**.

---

## ✅ **SOLUTION: Add Firebase Secrets to EAS**

### **Method 1: Using EAS CLI (Recommended)**

Run these commands **ONE BY ONE** in your terminal:

```powershell
# 1. Firebase API Key
eas env:create --name EXPO_PUBLIC_FIREBASE_API_KEY --value AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4 --scope project

# 2. Firebase Auth Domain
eas env:create --name EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN --value aquaintel00.firebaseapp.com --scope project

# 3. Firebase Project ID
eas env:create --name EXPO_PUBLIC_FIREBASE_PROJECT_ID --value aquaintel00 --scope project

# 4. Firebase Storage Bucket
eas env:create --name EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET --value aquaintel00.firebasestorage.app --scope project

# 5. Firebase Messaging Sender ID
eas env:create --name EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --value 833538659407 --scope project

# 6. Firebase App ID
eas env:create --name EXPO_PUBLIC_FIREBASE_APP_ID --value "1:833538659407:web:881696ee6955406938863a" --scope project
```

### **Visibility Options:**

When prompted for **visibility**, choose:

- **`plaintext`** - ✅ **RECOMMENDED** for Firebase config (needed at build time)
- **`secret`** - ❌ NOT recommended (encrypted, only for sensitive runtime secrets)
- **`sensitive`** - ❌ NOT recommended (hidden in logs, but accessible)

**Choose `plaintext` because:**
- Firebase credentials are needed during the **build process**
- They get bundled into the app (already public in the APK)
- EAS needs to read them to inject into `app.config.js`

---

### **Method 2: Using Expo Dashboard (Alternative)**

1. Go to: https://expo.dev/accounts/indalok/projects/aquaintel/environment-variables
2. Click **"Create environment variable"**
3. Add each variable:
   - **Name**: `EXPO_PUBLIC_FIREBASE_API_KEY`
   - **Value**: `AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4`
   - **Visibility**: `plaintext`
   - **Scope**: Leave all environments checked (or select production)
4. Repeat for all 6 Firebase variables

---

## 📋 **Firebase Variables Checklist**

Add these 6 environment variables to EAS:

- [ ] `EXPO_PUBLIC_FIREBASE_API_KEY` = `AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4`
- [ ] `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` = `aquaintel00.firebaseapp.com`
- [ ] `EXPO_PUBLIC_FIREBASE_PROJECT_ID` = `aquaintel00`
- [ ] `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` = `aquaintel00.firebasestorage.app`
- [ ] `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = `833538659407`
- [ ] `EXPO_PUBLIC_FIREBASE_APP_ID` = `1:833538659407:web:881696ee6955406938863a`

---

## 🔍 **Verify Secrets Were Added**

Check if secrets are set:
```powershell
eas env:list
```

You should see all 6 `EXPO_PUBLIC_FIREBASE_*` variables listed.

---

## 🚀 **After Adding Secrets - Rebuild**

Once all 6 Firebase secrets are added to EAS, trigger a new build:

```powershell
# Clean rebuild
eas build --platform android --profile production --clear-cache
```

---

## ❓ **Why Visibility = Plaintext?**

### **Visibility Types Explained:**

| Type | When to Use | Example Use Case |
|------|-------------|------------------|
| **`plaintext`** | Public config needed at build time | Firebase config, API endpoints, feature flags |
| **`sensitive`** | Somewhat private, hidden in logs | Database URLs, third-party API keys |
| **`secret`** | Highly sensitive runtime secrets | Payment processor keys, OAuth secrets |

### **Firebase Config = Plaintext Because:**

1. ✅ **Already Public**: Firebase config is embedded in your APK (users can extract it)
2. ✅ **Not Secret**: Firebase uses Security Rules to protect data, not API keys
3. ✅ **Build-time Required**: EAS must read these during build to inject into `app.config.js`
4. ✅ **Standard Practice**: Firebase docs recommend treating these as public

**Firebase Security** is handled by:
- Firestore Security Rules
- Firebase Authentication
- Cloud Functions permissions

NOT by hiding the API key!

---

## 🔒 **Security Best Practices**

### **What IS Secret (Don't Expose):**
- ❌ Firebase Admin SDK private key
- ❌ Service account JSON
- ❌ Database passwords
- ❌ OAuth client secrets

### **What's NOT Secret (Safe to Expose):**
- ✅ Firebase client API key (already in APK)
- ✅ Firebase project ID (public)
- ✅ Firebase auth domain (public)
- ✅ Storage bucket name (public)

**Your Firebase is secure through:**
```javascript
// Firestore Security Rules (set in Firebase Console)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🎯 **Complete Setup Steps**

### **Step 1: Add Secrets to EAS**
```powershell
# Run each command, choose "plaintext" when prompted for visibility
eas env:create --name EXPO_PUBLIC_FIREBASE_API_KEY --value AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4 --scope project
eas env:create --name EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN --value aquaintel00.firebaseapp.com --scope project
eas env:create --name EXPO_PUBLIC_FIREBASE_PROJECT_ID --value aquaintel00 --scope project
eas env:create --name EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET --value aquaintel00.firebasestorage.app --scope project
eas env:create --name EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --value 833538659407 --scope project
eas env:create --name EXPO_PUBLIC_FIREBASE_APP_ID --value "1:833538659407:web:881696ee6955406938863a" --scope project
```

### **Step 2: Verify**
```powershell
eas env:list
```

Should show:
```
Environment variables for @indalok/aquaintel:
  EXPO_PUBLIC_FIREBASE_API_KEY (plaintext)
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN (plaintext)
  EXPO_PUBLIC_FIREBASE_PROJECT_ID (plaintext)
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET (plaintext)
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID (plaintext)
  EXPO_PUBLIC_FIREBASE_APP_ID (plaintext)
```

### **Step 3: Rebuild**
```powershell
eas build --platform android --profile production --clear-cache
```

### **Step 4: Build Will Now:**
✅ Read Firebase config from EAS secrets  
✅ Inject them into `app.config.js` via `process.env`  
✅ Bundle them into the app  
✅ App launches without crashing  
✅ Firebase initializes successfully  

---

## 🐛 **Expected Build Output (After Fix)**

The build logs should show:
```
🔍 Debugging Firebase Config:
  Constants.expoConfig.extra: EXISTS ✅
  firebaseApiKey from extra: ***jeU4 ✅
  Final firebaseConfig: { apiKey: '***jeU4', authDomain: 'aquaintel00.firebaseapp.com', ... }
✅ Firebase config validation passed
```

**No more crash!** 🎉

---

## 📝 **Summary**

**Problem**: App crashes because EAS Build can't read your local `.env` file  
**Solution**: Add Firebase config to EAS environment variables with `plaintext` visibility  
**Visibility**: Use `plaintext` because Firebase client config is meant to be public  
**Security**: Protected by Firestore Rules and Firebase Auth, not by hiding the API key  

**After adding all 6 secrets and rebuilding, your app will launch successfully!** 🚀
