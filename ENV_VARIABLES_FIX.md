# 🔧 Firebase Environment Variables Fix

## Problem
App crashes with error: "Firebase configuration incomplete. Please check your .env file."

Even though `.env` file has all Firebase credentials filled in.

---

## Root Cause

**React Native/Expo Metro bundler caches the environment variables.**

When you:
1. Update `.env` file
2. Don't restart Metro bundler
3. App uses OLD cached (empty) values ❌

---

## Solution

### Quick Fix (Do this every time you update `.env`):

```powershell
# Stop the current Metro bundler (Ctrl+C if running)

# Clear cache and restart
npx expo start --clear
```

Then press `a` to reload on Android or `r` to reload the app.

---

## Why This Happens

### Environment Variable Loading Process:

```
.env file
    ↓
Metro bundler reads on startup
    ↓
Bundles variables into JavaScript
    ↓
App uses bundled values
```

**Problem:** Metro bundler only reads `.env` on startup!

**Solution:** Restart Metro after changing `.env`

---

## Step-by-Step Fix

### 1. Stop Current Server
Press `Ctrl+C` in the terminal running `npm start` or `npx expo start`

### 2. Clear Cache
```powershell
npx expo start --clear
```

**What this does:**
- Clears Metro bundler cache
- Re-reads `.env` file
- Rebuilds JavaScript bundle with new env vars

### 3. Reload App
- Press `a` to open on Android
- Or press `r` to reload if already open

### 4. Verify
Check the Metro bundler output for:
```
env: load .env
env: export EXPO_PUBLIC_FIREBASE_API_KEY ...
```

If you see this, environment variables are loaded! ✅

---

## Additional Troubleshooting

### Still Getting Error?

**Check `.env` file format:**

```bash
# ✅ CORRECT - No quotes, no spaces around =
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4

# ❌ WRONG - Has quotes
EXPO_PUBLIC_FIREBASE_API_KEY="AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4"

# ❌ WRONG - Has spaces
EXPO_PUBLIC_FIREBASE_API_KEY = AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4

# ❌ WRONG - Empty value
EXPO_PUBLIC_FIREBASE_API_KEY=
```

### Verify Environment Variables Are Loading

Add this temporarily to `App.js`:

```javascript
console.log('🔍 Firebase API Key:', process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
console.log('🔍 Firebase Project:', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);
```

**Expected output:**
```
🔍 Firebase API Key: AIzaSyCzTF8a7pGnP7K2PhPqUSGFhKe9OoEjeU4
🔍 Firebase Project: aquaintel00
```

**If you see `undefined`:** Environment variables not loaded - restart Metro with `--clear`

---

## Common Mistakes

### 1. Forgot to Restart Metro ❌
```powershell
# You edit .env
# But don't restart Metro
# App still uses old values
```

**Fix:** Always restart Metro after editing `.env`

### 2. Using `npm start` Instead of `npx expo start --clear` ❌
```powershell
npm start  # Might not clear cache
```

**Fix:** Use full command with `--clear` flag

### 3. Not Waiting for Metro to Fully Start ❌
```powershell
# You restart Metro
# Immediately press 'a' before it's ready
# Old bundle loads
```

**Fix:** Wait for "Waiting for the bundler to start" message to complete

---

## Nuclear Option (If Nothing Works)

### Complete Cache Clear:

```powershell
# Stop Metro (Ctrl+C)

# Clear ALL caches
rm -r node_modules/.cache
rm -r .expo

# Restart
npx expo start --clear
```

Or on Windows PowerShell:
```powershell
# Stop Metro (Ctrl+C)

# Clear caches
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue

# Restart
npx expo start --clear
```

---

## Best Practices

### 1. Always Use `--clear` Flag After `.env` Changes
```powershell
npx expo start --clear
```

### 2. Verify Environment Variables Load
Watch for this in Metro output:
```
env: load .env
env: export EXPO_PUBLIC_FIREBASE_API_KEY ...
```

### 3. Keep `.env` Format Clean
- No quotes around values
- No spaces around `=`
- No empty values for required vars

### 4. Don't Commit `.env` to Git
Already in `.gitignore` ✅

---

## Quick Reference

### Normal Development:
```powershell
npm start
```

### After Changing `.env`:
```powershell
npx expo start --clear
```

### Complete Reset:
```powershell
# PowerShell
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
npx expo start --clear
```

---

## Your Current Status

✅ **Firebase credentials filled in `.env`**  
✅ **Environment variables format correct**  
✅ **Metro bundler restarted with `--clear`**  
✅ **Environment variables loaded successfully**

**Next step:** Press `a` to reload the app on Android!

---

**Summary:** Always restart Metro bundler with `npx expo start --clear` after editing `.env` file. This ensures new environment variables are loaded into the app bundle.

**Last Updated:** October 5, 2025
