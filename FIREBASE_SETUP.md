# 🔥 Firebase Setup Guide for AquaIntel

## Critical: This Must Be Done Before Building!

Your app **will not work** without proper Firebase configuration. Follow these steps carefully.

---

## Part 1: Create Firebase Project

### Step 1: Go to Firebase Console
1. Visit: **https://console.firebase.google.com/**
2. Click **"Add project"** or **"Create a project"**

### Step 2: Create Project
1. **Project name:** `AquaIntel` (or any name you prefer)
2. Click **Continue**
3. **Google Analytics:** You can disable it for now (optional)
4. Click **Create project**
5. Wait for project creation (takes 30-60 seconds)
6. Click **Continue**

---

## Part 2: Add Web App to Firebase Project

### Step 1: Register Your App
1. In Firebase console, click the **Web icon** (`</>`) to add a web app
2. **App nickname:** `AquaIntel Web`
3. **Firebase Hosting:** Leave unchecked for now
4. Click **Register app**

### Step 2: Copy Configuration
You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...YOUR_ACTUAL_KEY",
  authDomain: "aquaintel-xxxxx.firebaseapp.com",
  projectId: "aquaintel-xxxxx",
  storageBucket: "aquaintel-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123..."
};
```

**⚠️ IMPORTANT: Copy these values - you'll need them in Step 3!**

---

## Part 3: Configure Environment Variables

### Step 1: Open Your `.env` File
Location: `c:\Users\Admin\Desktop\AquaIntel\.env`

### Step 2: Fill in Firebase Credentials
Replace the empty values with your actual Firebase config:

```bash
# ============================================
# FIREBASE CONFIGURATION (REQUIRED)
# ============================================
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...YOUR_ACTUAL_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123...
```

### Example (with dummy values):
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuv
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aquaintel-demo.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aquaintel-demo
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aquaintel-demo.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=987654321098
EXPO_PUBLIC_FIREBASE_APP_ID=1:987654321098:web:xyz789abc123
```

### Step 3: Save the File
Press **Ctrl+S** to save `.env`

---

## Part 4: Enable Firebase Authentication

### Step 1: Enable Email/Password Authentication
1. In Firebase console, go to **Build** → **Authentication**
2. Click **Get started**
3. Click **Email/Password** under "Sign-in method"
4. **Enable** the toggle
5. Click **Save**

### Step 2: Create Demo User (Optional)
1. Go to **Authentication** → **Users** tab
2. Click **Add user**
3. **Email:** `demo@aquaintel.gov.in`
4. **Password:** `AquaIntel@2025` (or use your own)
5. Click **Add user**

---

## Part 5: Set Up Firestore Database

### Step 1: Create Database
1. In Firebase console, go to **Build** → **Firestore Database**
2. Click **Create database**
3. **Location:** Choose closest to India (e.g., `asia-south1`)
4. **Security rules:** Start in **Test mode** for now
   - ⚠️ Warning: Test mode allows all access - fine for development
   - You'll secure this later before production
5. Click **Next** → **Enable**

### Step 2: Create Initial Collections (Optional)
You can add these later, but here's the structure:

```
/stations
  - {stationId}
    - name: string
    - state: string
    - district: string
    - location: {lat: number, lng: number}
    - currentLevel: number
    - status: string
    
/reports
  - {reportId}
    - userId: string
    - stationId: string
    - type: string
    - description: string
    - timestamp: timestamp
```

---

## Part 6: Set Up Firebase Storage (Optional)

For storing images uploaded by users:

1. Go to **Build** → **Storage**
2. Click **Get started**
3. **Security rules:** Start in test mode
4. Click **Next** → **Done**

---

## Part 7: Verify Setup

### Step 1: Restart Your Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm start
```

### Step 2: Test the App
```bash
npm start
```

Open the app and try:
1. **Sign Up** with a new account
2. **Login** with the account you created
3. **Demo Login** button (if you created the demo user)

### Expected Results:
- ✅ No "Firebase API key not found" errors
- ✅ Can create new account
- ✅ Can login successfully
- ✅ Can see dashboard after login

---

## Part 8: Environment Variables Reference

### Required Firebase Variables:
| Variable | What It Is | Example |
|----------|-----------|---------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | API key for Firebase | `AIzaSyB123...` |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth domain | `project-id.firebaseapp.com` |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Project ID | `aquaintel-demo` |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket | `project-id.appspot.com` |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID | `123456789012` |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | App ID | `1:123...:web:abc...` |

### Optional Variables:
| Variable | Purpose | Default |
|----------|---------|---------|
| `EXPO_PUBLIC_DEMO_EMAIL` | Demo login email | `demo@aquaintel.gov.in` |
| `EXPO_PUBLIC_DEMO_PASSWORD` | Demo login password | `AquaIntel@2025` |
| `EXPO_PUBLIC_USE_REAL_DATA` | Use government APIs | `true` |

---

## Troubleshooting

### Error: "Firebase API key not found"
**Solution:** Check that:
1. `.env` file exists in project root
2. All `EXPO_PUBLIC_FIREBASE_*` variables are filled
3. No spaces around `=` in `.env` file
4. You restarted the dev server after editing `.env`

### Error: "auth/user-not-found"
**Solution:** 
1. Create a user in Firebase Console → Authentication → Users
2. Or use the Signup screen to create a new account

### Error: "Demo login doesn't work"
**Solution:**
1. Create the demo user in Firebase Console:
   - Email: `demo@aquaintel.gov.in`
   - Password: `AquaIntel@2025`
2. Or change the credentials in `.env`:
   ```
   EXPO_PUBLIC_DEMO_EMAIL=your-demo-email@example.com
   EXPO_PUBLIC_DEMO_PASSWORD=your-demo-password
   ```

### Error: "Permission denied" in Firestore
**Solution:**
1. Go to Firestore → Rules
2. Use test mode rules:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
     }
   }
   ```
3. **Note:** Secure these before production!

---

## Security Notes

### ⚠️ Before Production:

1. **Secure Firestore Rules:**
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /stations/{stationId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /reports/{reportId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && 
                      request.auth.uid == request.resource.data.userId;
       }
     }
   }
   ```

2. **Secure Storage Rules:**
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /reports/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && 
                            request.auth.uid == userId;
       }
     }
   }
   ```

3. **Add Firebase App Check** for API security

---

## Quick Checklist

Before building your app, verify:

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] `.env` file updated with all Firebase credentials
- [ ] Email/Password authentication enabled
- [ ] Demo user created (optional)
- [ ] Firestore database created
- [ ] Development server restarted
- [ ] Test login works
- [ ] No console errors about Firebase

---

## Next Steps

After Firebase is set up:

1. **Test Authentication:**
   - Sign up a new user
   - Login with that user
   - Test demo login

2. **Integrate Government Data:**
   - See `GOVERNMENT_API_SETUP.md`
   - Configure API keys for CGWB, WRIS, IMD

3. **Build Your APK:**
   - See `BUILD_APK_GUIDE.md`
   - Your app will now work with real authentication!

---

## Need Help?

**Firebase Documentation:**
- [Get Started](https://firebase.google.com/docs/web/setup)
- [Authentication](https://firebase.google.com/docs/auth/web/start)
- [Firestore](https://firebase.google.com/docs/firestore/quickstart)

**AquaIntel Specific:**
- Check `.env.example` for all variables
- See `services/firebase.js` for implementation
- Open an issue on GitHub if stuck

---

**Last Updated:** October 5, 2025  
**Status:** Required for app to function! 🔥
