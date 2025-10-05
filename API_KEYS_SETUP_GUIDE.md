# 🚀 AquaIntel - Complete Setup & API Key Guide

## 📋 Table of Contents

1. [Get Google Maps API Key](#get-google-maps-api-key)
2. [Get Gemini AI API Key](#get-gemini-ai-api-key)
3. [Configure Environment Variables](#configure-environment-variables)
4. [Fix Dark Mode Issues](#fix-dark-mode-issues)
5. [Implement AI Assistant](#implement-ai-assistant)
6. [Test Everything](#test-everything)

---

## 🗺️ GET GOOGLE MAPS API KEY

### **Step 1: Go to Google Cloud Console**
- URL: https://console.cloud.google.com/

### **Step 2: Create Project**
1. Click "Select a Project" dropdown (top bar)
2. Click "NEW PROJECT"
3. Project Name: **AquaIntel**
4. Click "CREATE"
5. Wait for project creation (~30 seconds)
6. Select the new "AquaIntel" project

### **Step 3: Enable Required APIs**

Click each link and enable:

1. **Maps SDK for Android** (REQUIRED)
   - https://console.cloud.google.com/apis/library/maps-android-backend.googleapis.com
   - Click "ENABLE"

2. **Places API** (REQUIRED for search)
   - https://console.cloud.google.com/apis/library/places-backend.googleapis.com
   - Click "ENABLE"

3. **Geocoding API** (REQUIRED for address lookup)
   - https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com
   - Click "ENABLE"

4. **Directions API** (Optional - for routing)
   - https://console.cloud.google.com/apis/library/directions-backend.googleapis.com
   - Click "ENABLE"

### **Step 4: Create API Key**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "**+ CREATE CREDENTIALS**" (top bar)
3. Select "**API key**"
4. **COPY THE KEY** immediately (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
5. Save it somewhere safe!

### **Step 5: Restrict API Key (IMPORTANT for Security)**

1. After creating, click on the key name to edit
2. Under "**Application restrictions**":
   - Select "**Android apps**"
   - Click "**+ Add an item**"
   - Package name: `com.aquaintel.app`
   - SHA-1 certificate fingerprint: Get it below ⬇️

**How to get SHA-1 fingerprint:**

```powershell
# If using EAS Build (recommended):
eas credentials

# Select: Android → Select build profile → View credentials
# Copy the "SHA-1 Fingerprint"
```

Example SHA-1: `1A:2B:3C:4D:5E:6F:7G:8H:9I:0J:1K:2L:3M:4N:5O:6P:7Q:8R:9S:0T`

3. Under "**API restrictions**":
   - Select "**Restrict key**"
   - Check these APIs:
     - ✅ Maps SDK for Android
     - ✅ Places API
     - ✅ Geocoding API
     - ✅ Directions API (if enabled)
4. Click "**SAVE**"

### **Step 6: Add to Project**

```properties
# Add to .env file:
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```powershell
# Add to EAS (for cloud builds):
eas env:create --name EXPO_PUBLIC_GOOGLE_MAPS_API_KEY --value "YOUR_KEY_HERE" --scope project
# Choose: plaintext, all environments (development, preview, production)
```

---

## 🤖 GET GEMINI AI API KEY

### **Step 1: Go to Google AI Studio**
- URL: https://aistudio.google.com/apikey

### **Step 2: Sign In**
- Use your Google account
- Accept terms if prompted

### **Step 3: Create API Key**
1. Click "**Get API key**" button
2. Select "**Create API key in new project**"
   - OR select existing project (use "AquaIntel" if you want)
3. Wait for key generation
4. **COPY THE KEY** (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
5. Click "**Done**"

### **Step 4: Enable Gemini API**

1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Select your project ("AquaIntel")
3. Click "**ENABLE**"

### **Step 5: (Optional) Set Quota Limits**

1. Go to: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
2. Check your free tier limits:
   - **Free tier**: 15 requests/minute, 1500 requests/day
   - **Paid tier**: Higher limits (requires billing)

### **Step 6: Add to Project**

```properties
# Add to .env file:
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```powershell
# Add to EAS (for cloud builds):
eas env:create --name EXPO_PUBLIC_GEMINI_API_KEY --value "YOUR_KEY_HERE" --scope project
# Choose: plaintext, all environments
```

---

## ⚙️ CONFIGURE ENVIRONMENT VARIABLES

### **Local Development (.env file)**

Edit `c:\Users\Admin\Desktop\AquaIntel\.env`:

```properties
# ============================================
# GOOGLE MAPS API (Required for Maps)
# ============================================
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# ============================================
# GEMINI AI API (Required for AI Assistant)
# ============================================
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY

# (Keep all other existing Firebase variables)
```

### **EAS Build (Cloud Builds)**

```powershell
# Run these commands to add to EAS:

# Google Maps
eas env:create --name EXPO_PUBLIC_GOOGLE_MAPS_API_KEY --value "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" --scope project

# Gemini AI
eas env:create --name EXPO_PUBLIC_GEMINI_API_KEY --value "AIzaSyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" --scope project

# When prompted:
# - Visibility: plaintext
# - Environments: Select all (development, preview, production)
```

### **Verify Environment Variables**

```powershell
# List all EAS environment variables:
eas env:list

# You should see:
# EXPO_PUBLIC_FIREBASE_API_KEY (plaintext)
# EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN (plaintext)
# EXPO_PUBLIC_FIREBASE_PROJECT_ID (plaintext)
# EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET (plaintext)
# EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID (plaintext)
# EXPO_PUBLIC_FIREBASE_APP_ID (plaintext)
# EXPO_PUBLIC_GOOGLE_MAPS_API_KEY (plaintext)  ← NEW
# EXPO_PUBLIC_GEMINI_API_KEY (plaintext)       ← NEW
```

---

## 🌙 FIX DARK MODE ISSUES

### **Problem:**
Text appears unreadable in dark mode (white text on light background, dark text on dark background).

### **Solution:**
Replace all hardcoded colors with theme colors.

### **Files that Need Fixing:**

#### **1. Update `MapScreen.jsx`:**

Add dark mode support:

```jsx
// At top of file:
import { getMapStyle } from '../../config/mapStyles';

// Inside component:
const theme = useTheme();
const isDark = theme.dark;

// Update MapView:
<MapView
  ref={mapRef}
  provider={PROVIDER_GOOGLE}
  style={styles.map}
  customMapStyle={getMapStyle(isDark)}  // ← ADD THIS
  initialRegion={{
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  }}
>
```

#### **2. Update All Screens with Theme Colors:**

**Bad (Hardcoded):**
```jsx
<Text style={{ color: '#333' }}>Hello</Text>  // ❌ Dark text
<View style={{ backgroundColor: '#fff' }} />  // ❌ White background
```

**Good (Theme-aware):**
```jsx
<Text style={{ color: theme.colors.onSurface }}>Hello</Text>  // ✅ Adapts
<View style={{ backgroundColor: theme.colors.surface }} />    // ✅ Adapts
```

**Theme Colors Reference:**
```javascript
theme.colors.primary          // Indian saffron (#FF9933)
theme.colors.background       // #F5F5F5 (light) / #121212 (dark)
theme.colors.surface          // #FFFFFF (light) / #1E1E1E (dark)
theme.colors.onSurface        // #1C1B1F (light) / #E1E1E1 (dark)
theme.colors.onSurfaceVariant // #49454F (light) / #CAC4D0 (dark)
theme.colors.outline          // #79747E (light) / #938F99 (dark)
```

#### **3. Fix Specific Screens:**

Run this search/replace in ALL screen files:

```javascript
// Find: color: '#333'
// Replace with: color: theme.colors.onSurface

// Find: color: '#666'
// Replace with: color: theme.colors.onSurfaceVariant

// Find: backgroundColor: '#fff'
// Replace with: backgroundColor: theme.colors.surface

// Find: backgroundColor: '#F5F5F5'
// Replace with: backgroundColor: theme.colors.background
```

---

## 🤖 IMPLEMENT AI ASSISTANT

The AI Assistant is already created! Just integrate it into your app.

### **Update `App.js`:**

```jsx
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme, darkTheme } from './constants/theme';
import { AuthProvider, useAuth } from './store/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import AIAssistant from './components/AIAssistant';  // ← IMPORT
import AsyncStorage from '@react-native-async-storage/async-storage';

function AppContent() {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('@theme_preference');
      if (theme) setIsDarkMode(theme === 'dark');
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  // User context for AI
  const userContext = {
    name: user?.displayName,
    email: user?.email,
    region: 'India',
    district: user?.district || 'New Delhi',
    state: user?.state || 'Delhi',
    role: 'Citizen',
  };

  // App state for AI
  const [appState, setAppState] = useState({
    waterLevel: null,
    rainfall: null,
    season: 'summer',
    alerts: [],
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <RootNavigator />
          
          {/* AI Assistant FAB - Show when logged in */}
          {user && (
            <AIAssistant
              userContext={userContext}
              appState={appState}
              visible={true}
            />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
```

---

## ✅ TEST EVERYTHING

### **1. Test API Keys Locally**

```powershell
# Start development server:
npm start

# Or run on Android:
npm run android
```

**Check for errors in console:**
- ✅ No "API key not found" errors
- ✅ Maps load properly
- ✅ AI Assistant appears (pulsing FAB at bottom-right)

### **2. Test AI Assistant**

1. Login to the app
2. Look for **pulsing robot icon** at bottom-right
3. Click to open chat
4. Try these questions:
   - "What's the water level trend in my area?"
   - "How much rainfall is expected this month?"
   - "Give me irrigation tips for summer"
   - "How can I conserve groundwater?"

**Expected behavior:**
- ✅ Chat opens smoothly
- ✅ Quick question chips appear
- ✅ AI responds within 2-3 seconds
- ✅ Responses are relevant and helpful

### **3. Test Dark Mode**

1. Go to Settings
2. Toggle dark mode
3. Check all screens:
   - ✅ All text is readable
   - ✅ No white text on white background
   - ✅ No dark text on dark background
   - ✅ Maps use dark theme

### **4. Test Maps**

1. Go to Map screen
2. Check:
   - ✅ Map loads (no blank screen)
   - ✅ Markers appear
   - ✅ Can zoom/pan
   - ✅ Dark mode styling works
   - ✅ Clicking markers shows info

### **5. Build for Production**

```powershell
# Ensure all env vars are in EAS:
eas env:list

# Clear cache and build:
eas build --platform android --profile production --clear-cache

# Monitor build logs for:
# ✅ "Using Google Maps API key: AIzaSy***"
# ✅ "Gemini AI configured successfully"
# ✅ No API key errors
```

---

## 🎯 SUMMARY

### **What You've Implemented:**

✅ **Google Maps Integration**
- Full map with dark/light mode support
- Custom styling
- Marker clustering ready
- Search functionality ready

✅ **Gemini AI Assistant**
- Floating FAB button
- Full chat interface
- Personalized to user's region
- Context-aware responses
- Quick questions
- Chat history

✅ **Dark Mode Fixed**
- All screens theme-aware
- Maps adapt to theme
- Text always readable

### **API Keys You Need:**

1. **Google Maps API Key**
   - Get from: https://console.cloud.google.com/
   - Enable: Maps SDK for Android, Places API, Geocoding API
   - Add to: `.env` and EAS

2. **Gemini AI API Key**
   - Get from: https://aistudio.google.com/apikey
   - Enable: Generative Language API
   - Add to: `.env` and EAS

### **Next Steps:**

1. ✅ Get both API keys (follow guides above)
2. ✅ Add to `.env` file
3. ✅ Add to EAS environment variables
4. ✅ Update `App.js` to include AIAssistant
5. ✅ Update `MapScreen.jsx` with dark mode
6. ✅ Build and test!

---

## 📞 **Troubleshooting**

### **"Maps not loading"**
- Check Google Maps API key is correct
- Ensure SHA-1 fingerprint is added to API key restrictions
- Check Maps SDK for Android is enabled
- Check build logs for API key errors

### **"AI Assistant not responding"**
- Check Gemini API key is correct
- Check console for quota errors (free tier: 15 req/min)
- Enable Generative Language API in Cloud Console
- Check network connection

### **"Dark mode still broken"**
- Search for hardcoded colors: `color: '#'`
- Replace with `theme.colors.*`
- Check `useTheme()` hook is called in component
- Rebuild app

---

**🎉 Your AquaIntel app now has Google Maps and AI Assistant fully integrated!**

For more features (drawer navigation, animations, etc.), see:
- `IMPLEMENTATION_PLAN.md`
- `COMPLETE_IMPLEMENTATION_GUIDE.md`
