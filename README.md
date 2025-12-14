<div align="center"># 💧 AquaIntel<div align="center"><div align="center">



# 💧 AquaIntel**AI-Powered Groundwater Intelligence Platform for India**# 💧 AquaIntel# AquaIntel



### AI-Powered Groundwater Intelligence Platform for India[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)### AI-Powered Groundwater Intelligence Platform for IndiaGroundwater intelligence for India (Expo React Native)



[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)

[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)</div>

[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)



🔗 **[Live Demo](https://aquaintel-indalok.vercel.app/)** · [Report Bug](https://github.com/IndAlok/AquaIntel/issues) · [Request Feature](https://github.com/IndAlok/AquaIntel/issues)[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)



<img src="assets/logo.png" alt="AquaIntel Logo" width="120" />🔗 **[Live Demo](https://aquaintel-indalok.vercel.app/)** · [Report Bug](https://github.com/IndAlok/AquaIntel/issues) · [Request Feature](https://github.com/IndAlok/AquaIntel/issues)[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)---



</div>---[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)



---## 🌊 About[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)## Overview



## 📋 Table of Contents**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using React Native and Expo, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.**[Live Demo](https://aquaintel.vercel.app)** · **[Report Bug](https://github.com/IndAlok/AquaIntel/issues)** · **[Request Feature](https://github.com/IndAlok/AquaIntel/issues)**AquaIntel is an Expo-based React Native app that visualizes groundwater and rainfall data for India. It can use live data from the National Water Informatics Centre (NWIC) when enabled, and falls back to high-fidelity mock data for offline/demo use. Authentication and analytics are optional and powered by Firebase when configured.



- [About](#-about)The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's Gemini Flash 2.5 model to provide personalized water management advice.<img src="assets/logo.png" alt="AquaIntel Logo" width="120" />> Deployment note: This is a mobile-first Expo project. Publish via Expo (EAS/Expo Go) or native builds. Netlify/Vercel are not appropriate targets unless you intentionally build the experimental Expo web bundle.

- [Features](#-features)

- [Tech Stack](#-tech-stack)### 🎯 Problem Statement</div>## What works today

- [Architecture](#-architecture)

- [Getting Started](#-getting-started)India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:---- Dashboard with loading/error/empty states and data-source badges

- [Environment Variables](#-environment-variables)

- [Deployment](#-deployment)- **Democratizing access** to groundwater data for farmers, officials, and citizens- Station list/detail with charts using either NWIC data or mocks

- [API Integration](#-api-integration)

- [Project Structure](#-project-structure)- **Providing actionable insights** through AI-powered analysis

- [Roadmap](#-roadmap)

- [Contributing](#-contributing)- **Enabling informed decision-making** for irrigation, conservation, and policy## 📋 Table of Contents- Rainfall and groundwater time series (NWIC → fallback)

- [License](#-license)

---- Water quality fetch (NWIC → fallback synthetic values)

---

## ✨ Features- [About](#-about)- Derived state stats and drought heuristics (from NWIC aggregates when enabled)

## 🌊 About

### 📊 Dashboard & Analytics- [Features](#-features)- Auth flow (Firebase email/password) that gracefully disables if config is missing

**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using **React Native** and **Expo**, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.

- Real-time groundwater level monitoring across 1000+ stations

The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's **Gemini Flash 2.5** model to provide personalized water management advice.

- Interactive charts and trend analysis using Victory Native- [Tech Stack](#-tech-stack)

### 🎯 Problem Statement

- State and district-level statistics aggregation

India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:

- Critical/Warning/Normal status indicators- [Architecture](#-architecture)Simulated/placeholder pieces:

- 🌐 **Democratizing access** to groundwater data for farmers, officials, and citizens

- 📊 **Providing actionable insights** through AI-powered analysis### 🗺️ Interactive Maps- [Getting Started](#-getting-started)

- 💡 **Enabling informed decision-making** for irrigation, conservation, and policy

- Cross-platform map support (React Native Maps for mobile, Leaflet for web)

---

- Station clustering and filtering by status- [Environment Variables](#-environment-variables)- AI predictions and risk insights are mock-generated

## ✨ Features

- Geolocation-based nearest station discovery

### 📊 Dashboard & Analytics

- Real-time groundwater level monitoring across **1000+ stations**- [Deployment](#-deployment)- Notifications/offline sync are not yet implemented

- Interactive charts and trend analysis using **Victory Native**

- State and district-level statistics aggregation### 🤖 AquaIntel AI Assistant

- Critical/Warning/Normal status indicators with color coding

- Powered by **Google Gemini Flash 2.5**- [API Integration](#-api-integration)- Community reporting UI exists but uses mock flows

### 🗺️ Interactive Maps

- **Cross-platform map support**:- Context-aware responses based on user's location and data

  - React Native Maps for iOS/Android

  - Leaflet for web deployment- Markdown rendering for formatted AI responses- [Screenshots](#-screenshots)

- Station clustering and filtering by status

- Geolocation-based nearest station discovery- Quick questions and smart suggestions

- Custom markers with real-time data

- Chat history persistence- [Roadmap](#-roadmap)## Tech stack

### 🤖 AquaIntel AI Assistant

- Powered by **Google Gemini Flash 2.5**### 🔐 Authentication- [Contributing](#-contributing)

- Context-aware responses based on user's location and current data

- **Markdown rendering** for formatted AI responses (bold, lists, code blocks)- Firebase Authentication (Email/Password + Google Sign-In)

- Quick questions and smart contextual suggestions

- Chat history persistence with AsyncStorage- Secure token refresh and session management- [License](#-license)- React Native 0.81 / Expo SDK 54

- Region-specific agricultural and irrigation advice

- User profile with Firestore integration

### 🔐 Authentication & Security

- **Firebase Authentication**:- React Navigation, React Native Paper, Victory Native, React Native Maps

  - Email/Password authentication

  - Google Sign-In for web and mobile### 📱 Cross-Platform

- Secure token refresh and session management

- User profiles stored in Cloud Firestore- iOS and Android native apps via Expo---- Firebase (Auth optional) with graceful noop when not configured

- Input validation and error handling

- Web deployment with responsive design

### 📱 Cross-Platform

- **iOS** and **Android** native apps via Expo- Platform-specific optimizations (maps, animations)- NWIC datastore_search (public) via `services/nwicService.js` (uses hardcoded resource IDs; no HTML scraping to keep native/web compatibility)

- **Web** deployment with responsive design

- Platform-specific optimizations (maps, animations, UI components)### 🌙 Theme Support## 🌊 About- Mock data under `data/` for safe demos

- Shared codebase with platform extensions (.web.jsx, .native.jsx)

- Light and Dark mode with system preference detection

### 🌙 Theme Support

- Light and Dark mode with automatic system preference detection- Consistent Material Design 3 styling via React Native Paper**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using React Native and Expo, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.## Environment setup

- Consistent **Material Design 3** styling via React Native Paper

- Theme-aware components and dynamic colors---The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's Gemini Flash 2.5 model to provide personalized water management advice.Create a `.env` (gitignored) using the template below. Leave values blank if you don’t want that service enabled.

- Persistent theme preference

## 🛠️ Tech Stack### 🎯 Problem Statement```

---

### Frontend# Firebase (optional)

## 🛠️ Tech Stack

| Technology | Purpose |

### Frontend

|------------|---------|India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:EXPO_PUBLIC_FIREBASE_API_KEY=

| Technology | Version | Purpose |

|------------|---------|---------|| React Native 0.81 | Cross-platform mobile framework |

| **React Native** | 0.81.5 | Cross-platform mobile framework |

| **Expo** | SDK 54 | Development and build toolchain || Expo SDK 54 | Development and build toolchain |EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=

| **React Navigation** | 7.x | Navigation (Drawer + Stack) |

| **React Native Paper** | 5.11.6 | Material Design 3 UI components || React Navigation 7 | Navigation (Drawer + Stack) |

| **Victory Native** | Latest | Data visualization and charts |

| **React Native Maps** | Latest | Native map integration (mobile) || React Native Paper 5 | Material Design 3 UI components |- **Democratizing access** to groundwater data for farmers, officials, and citizensEXPO_PUBLIC_FIREBASE_PROJECT_ID=

| **React-Leaflet** | Latest | Web map integration |

| **React Native Reanimated** | 3.x | Smooth 60fps animations || Victory Native | Data visualization and charts |

| **React Native Markdown Display** | 7.0.2 | Markdown rendering in AI chat |

| React Native Maps | Native map integration (mobile) |- **Providing actionable insights** through AI-powered analysisEXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=

### Backend & Services

| React-Leaflet | Web map integration |

| Technology | Purpose |

|------------|---------|| React Native Reanimated 3 | Smooth animations |- **Enabling informed decision-making** for irrigation, conservation, and policyEXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

| **Firebase Auth** | User authentication and session management |

| **Cloud Firestore** | User profiles and structured data storage |### Backend & ServicesEXPO_PUBLIC_FIREBASE_APP_ID=

| **Google Gemini AI** | AI assistant capabilities (Flash 2.5 model) |

| **NWIC APIs** | Live groundwater and rainfall data || Technology | Purpose |



### DevOps & Tools|------------|---------|---EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=



| Technology | Purpose || Firebase Auth | User authentication |

|------------|---------|

| **Vercel** | Web deployment and hosting || Cloud Firestore | User profiles and data storage |## ✨ Features# Demo login (optional)

| **EAS Build** | Native app builds for iOS/Android |

| **Git & GitHub** | Version control and collaboration || Google Gemini AI | AI assistant capabilities |



---| NWIC APIs | Live groundwater data |EXPO_PUBLIC_DEMO_EMAIL=



## 🏗️ Architecture### DevOps### 📊 Dashboard & AnalyticsEXPO_PUBLIC_DEMO_PASSWORD=



```| Technology | Purpose |

┌─────────────────────────────────────────────────────────────┐

│                        AquaIntel App                        │|------------|---------|- Real-time groundwater level monitoring across 1000+ stations

├─────────────────────────────────────────────────────────────┤

│                                                             │| Vercel | Web deployment and hosting |

│  ┌───────────────┐  ┌────────────┐  ┌──────────────────┐   │

│  │   Screens     │  │ Components │  │   Navigation     │   │| EAS Build | Native app builds |- Interactive charts and trend analysis using Victory Native# NWIC data (set to true to hit live API)

│  │               │  │            │  │                  │   │

│  │  Dashboard    │  │ AIAssist   │  │  Drawer          │   │---- State and district-level statistics aggregationEXPO_PUBLIC_USE_REAL_DATA=false

│  │  MapScreen    │  │ DataCard   │  │  Stack           │   │

│  │  Stations     │  │ Charts     │  │  Auth Flow       │   │## 🏗️ Architecture- Critical/Warning/Normal status indicatorsEXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search

│  │  Profile      │  │ Header     │  │                  │   │

│  └───────┬───────┘  └─────┬──────┘  └──────────────────┘   │````EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=

│          │                │                                 │

│  ┌───────┴────────────────┴──────────┐                      │┌─────────────────────────────────────────────────────────────┐

│  │         Services Layer            │                      │

│  │                                   │                      ││                        AquaIntel App                        │### 🗺️ Interactive MapsEXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=

│  │  dataService    geminiAI          │                      │

│  │  nwicService    firebase          │                      │├─────────────────────────────────────────────────────────────┤

│  │  governmentAPI  firebaseAnalytics │                      │

│  │                                   │                      ││                                                             │- Cross-platform map support (React Native Maps for mobile, Leaflet for web)EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=

│  └───────────────┬───────────────────┘                      │

│                  │                                          ││  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  │

│  ┌───────────────┴───────────────────┐                      │

│  │       State Management            │                      ││  │  Screens  │  │Components │  │      Navigation         │  │- Station clustering and filtering by statusEXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=

│  │                                   │                      │

│  │  AuthContext    ThemeContext      │                      ││  │ Dashboard │  │ AIAssist  │  │    Drawer + Stack       │  │

│  │                                   │                      │

│  └───────────────────────────────────┘                      ││  │   Maps    │  │  Charts   │  │                         │  │- Geolocation-based nearest station discoveryEXPO_PUBLIC_NWIC_STATE_STATS_RESOURCE_ID=

│                                                             │

└─────────────────────────────────────────────────────────────┘│  │ Stations  │  │   Cards   │  │                         │  │

                            │

                            ▼│  └─────┬─────┘  └─────┬─────┘  └─────────────────────────┘  │EXPO_PUBLIC_NWIC_DROUGHT_RESOURCE_ID=

┌─────────────────────────────────────────────────────────────┐

│                    External Services                        ││        │              │                                     │

│                                                             │

│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   ││  ┌─────┴──────────────┴─────┐                               │### 🤖 AquaIntel AI AssistantEXPO_PUBLIC_NWIC_PREDICTION_RESOURCE_ID=SIMULATED

│  │  Firebase   │  │    NWIC      │  │  Google Gemini   │   │

│  │  Auth +     │  │  Data APIs   │  │  Flash 2.5 AI    │   ││  │      Services Layer      │                               │

│  │  Firestore  │  │  (CKAN)      │  │                  │   │

│  └─────────────┘  └──────────────┘  └──────────────────┘   ││  │  dataService  geminiAI   │                               │- Powered by **Google Gemini Flash 2.5**```

│                                                             │

└─────────────────────────────────────────────────────────────┘│  │  nwicService  firebase   │                               │

```

│  └─────────────┬────────────┘                               │- Context-aware responses based on user's location and data

---

│                │                                            │

## 🚀 Getting Started

│  ┌─────────────┴────────────┐                               │- **Markdown rendering** for formatted AI responsesSecurity defaults:

### Prerequisites

│  │    State Management      │                               │

- **Node.js** 18.x or higher

- **npm** or **yarn**│  │ AuthContext ThemeContext │                               │- Quick questions and smart suggestions

- **Expo CLI**: Install globally with `npm install -g @expo/cli`

- **Android Studio** (for Android development)│  └──────────────────────────┘                               │

- **Xcode** (for iOS development, macOS only)

│                                                             │- Chat history persistence- `.env` and `.env.local` are already gitignored.

### Installation

└─────────────────────────────────────────────────────────────┘

1. **Clone the repository**

                            │- The repo contains **no live keys**; supply your own before production.

```bash

git clone https://github.com/IndAlok/AquaIntel.git                            ▼

cd AquaIntel

```┌─────────────────────────────────────────────────────────────┐### 🔐 Authentication



2. **Install dependencies**│                    External Services                        │



```bash│  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  │- Firebase Authentication (Email/Password + Google Sign-In)## Running locally

npm install

```│  │  Firebase │  │   NWIC    │  │    Google Gemini AI     │  │



3. **Configure environment variables**│  │Auth+Store │  │ Data APIs │  │      Flash 2.5          │  │- Secure token refresh and session management



```bash│  └───────────┘  └───────────┘  └─────────────────────────┘  │

# Copy the example environment file

cp .env.example .env└─────────────────────────────────────────────────────────────┘- User profile with Firestore integration```bash



# Edit .env with your API keys and configuration````

# See Environment Variables section below

```npm install



4. **Start the development server**---



```bash### 📱 Cross-Platformnpm start # starts Expo dev server

npm start

```## 🚀 Getting Started



This will start the Expo development server and show a QR code.- **iOS** and **Android** native apps via Exponpm run android # open on Android emulator/device



5. **Run on your preferred platform**### Prerequisites



```bash- **Web** deployment with responsive designnpm run web # experimental web build (not production hardened)

# For Android

npm run android- Node.js 18+



# For iOS (macOS only)- npm or yarn- Platform-specific optimizations (maps, animations)```

npm run ios

- Expo CLI: `npm install -g @expo/cli`

# For Web

npm run web- Android Studio (for Android development)### 🌙 Theme Support## Deployment guidance

```

- Xcode (for iOS development, macOS only)

---

- Light and Dark mode with system preference detection

## 🔐 Environment Variables

### Installation

Create a `.env` file in the project root with the following variables:

- Consistent Material Design 3 styling via React Native Paper- **Recommended:** Use Expo EAS to build/publish mobile apps. This project is optimized for devices, not static hosting.

```env

# ============================================1. **Clone the repository**

# Firebase Configuration

# Get from: Firebase Console > Project Settings > General```bash- **Not recommended:** Netlify/Vercel static hosting. Expo web can be built, but React Native-specific modules (maps, reanimated, native Firebase) are not tuned for a production web experience.

# ============================================

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_heregit clone https://github.com/IndAlok/AquaIntel.git

EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-idcd AquaIntel---

EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789```

EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX## Data sources and fallbacks



# ============================================2. **Install dependencies**

# Google Gemini AI

# Get from: https://aistudio.google.com/apikey````bash## 🛠️ Tech Stack

# ============================================

EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_herenpm install



# ============================================```- Primary live data: NWIC `datastore_search` (public). Configurable via `.env`.

# Data Configuration

# ============================================

EXPO_PUBLIC_USE_REAL_DATA=true

EXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search3. **Configure environment variables**### Frontend- Secondary legacy APIs: placeholders in `governmentAPI.js` (only used if enabled).



# ============================================```bash

# NWIC Resource IDs (Optional)

# Obtain from NWIC Data Portalcp .env.example .env| Technology | Purpose |- Fallback: Mock datasets in `data/` keep the app usable offline or without credentials.

# ============================================

EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=your_resource_id# Edit .env with your API keys

EXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=your_resource_id

EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=your_resource_id```|------------|---------|

EXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=your_resource_id

```



> ⚠️ **Security Note**: Never commit `.env` files to version control. The `.env` file is already in `.gitignore`.4. **Start the development server**| **React Native 0.81** | Cross-platform mobile framework |## Project structure (high level)



---```bash



## 🌐 Deploymentnpm start| **Expo SDK 54** | Development and build toolchain |



### Web Deployment (Vercel)````



1. **Build for web**| **React Navigation 7** | Navigation (Drawer + Stack) |```



```bash5. **Run on platform**

npx expo export --platform web

```````bash| **React Native Paper 5** | Material Design 3 UI components |components/ Reusable UI



2. **Deploy to Vercel**npm run android    # Android



```bashnpm run ios        # iOS (macOS only)| **Victory Native** | Data visualization and charts |screens/ Auth + main feature screens

# Install Vercel CLI if not already installed

npm install -g vercelnpm run web        # Web browser



# Deploy to production```| **React Native Maps** | Native map integration (mobile) |services/ Data adapters (nwicService, dataService, firebase, etc.)

vercel --prod

```



3. **Configure Firebase for web deployment**---| **React-Leaflet** | Web map integration |data/ Mock datasets



   - Go to [Firebase Console](https://console.firebase.google.com/)

   - Navigate to **Authentication** → **Settings** → **Authorized domains**

   - Add your Vercel domain (e.g., `aquaintel-indalok.vercel.app`)## 🔐 Environment Variables| **React Native Reanimated 3** | Smooth animations |store/ Context providers (auth/theme)



### Mobile Deployment (EAS Build)



1. **Configure EAS**Create a `.env` file in the project root:utils/ Helpers (animations, theme)



```bash

eas build:configure

``````env### Backend & Services```



2. **Build for Android**# Firebase Configuration



```bashEXPO_PUBLIC_FIREBASE_API_KEY=your_api_key| Technology | Purpose |

eas build --platform android --profile production

```EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com



3. **Build for iOS**EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id|------------|---------|## Roadmap (truthful)



```bashEXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

eas build --platform ios --profile production

```EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id| **Firebase Auth** | User authentication |



4. **Submit to stores**EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id



```bash| **Cloud Firestore** | User profiles and data storage |- [x] NWIC integration with national aggregation + graceful fallbacks

# Submit to Google Play Store

eas submit --platform android# Google Gemini AI



# Submit to Apple App StoreEXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key| **Google Gemini AI** | AI assistant capabilities |- [x] Mock-friendly dashboards and station detail views

eas submit --platform ios

```



---# Data Configuration| **NWIC APIs** | Live groundwater data |- [ ] Harden Expo web or provide dedicated web client



## 🔌 API IntegrationEXPO_PUBLIC_USE_REAL_DATA=true



### National Water Informatics Centre (NWIC)EXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search- [ ] Real push notifications and offline cache/sync



AquaIntel integrates with NWIC's public CKAN datastore API:````



| Endpoint | Data Type | Usage |### DevOps- [ ] Replace mock AI predictions with a real model/service

|----------|-----------|-------|

| `datastore_search` | Groundwater Stations | Station metadata and locations |> ⚠️ **Security Note**: Never commit `.env` files to version control.

| `datastore_search` | Water Level Time Series | Historical water level data |

| `datastore_search` | Rainfall Data | Precipitation measurements || Technology | Purpose |- [ ] Expand NWIC resource coverage list and caching window

| `datastore_search` | Water Quality | pH, TDS, hardness parameters |

---

**Features:**

- Automatic fallback to mock data when API is unavailable|------------|---------|

- Smart caching (5-minute cache duration)

- Error handling with user-friendly messages## 🌐 Deployment



### Google Gemini AI| **Vercel** | Web deployment and hosting |## Contributing



The AI assistant leverages Gemini Flash 2.5 for:### Web (Vercel)



- **Natural Language Understanding**: Contextual conversation| **EAS Build** | Native app builds |

- **Water Management Advice**: Region-specific recommendations

- **Crop Guidance**: Irrigation scheduling based on water levels1. Build for web:

- **Government Schemes**: Information about Jal Jeevan Mission, etc.

```bash| **GitHub Actions** | CI/CD pipeline |Pull requests are welcome. Please avoid committing secrets; use `.env` locally and keep keys out of Git history.

**Configuration:**

```javascriptnpx expo export --platform web

// Model: gemini-2.0-flash-exp

// Temperature: 0.7 (balanced creativity)````---## License

// Max Output Tokens: 1024 (concise responses)

```



---2. Deploy to Vercel:## 🏗️ ArchitectureMIT. See `LICENSE`.



## 📁 Project Structure```bash



```vercel --prod```

AquaIntel/

│```┌─────────────────────────────────────────────────────────────┐

├── components/              # Reusable UI components

│   ├── AIAssistant.jsx      # AI chat interface with Gemini│                        AquaIntel App                        │

│   ├── AnimatedSplash.jsx   # App splash screen

│   ├── DataCard.jsx         # Dashboard cards3. Add your Vercel domain to Firebase Console → Authentication → Settings → Authorized domains├─────────────────────────────────────────────────────────────┤

│   ├── WaterLevelChart.jsx  # Victory charts

│   ├── GaugeIndicator.jsx   # Circular gauge│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │

│   └── AppHeader.jsx        # Navigation header

│### Mobile (EAS Build)│  │   Screens   │  │ Components  │  │     Navigation      │  │

├── screens/

│   ├── auth/                # Authentication screens│  │  Dashboard  │  │  AIAssist   │  │  Drawer + Stack     │  │

│   │   ├── LoginScreen.jsx

│   │   ├── SignupScreen.jsx```bash│  │    Maps     │  │   Charts    │  │                     │  │

│   │   ├── OnboardingScreen.jsx

│   │   └── SplashScreen.jsxeas build:configure│  │  Stations   │  │   Cards     │  │                     │  │

│   │

│   └── main/                # Main app screenseas build --platform android│  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘  │

│       ├── DashboardScreen.jsx

│       ├── MapScreen.jsxeas build --platform ios│         │                │                                   │

│       ├── StationDetailScreen.jsx

│       ├── ProfileScreen.jsx```│  ┌──────┴────────────────┴──────┐                           │

│       ├── SettingsScreen.jsx

│       ├── ForecastScreen.jsx│  │         Services Layer        │                           │

│       └── AIChat.jsx

│---│  │  ┌─────────┐ ┌─────────────┐ │                           │

├── services/                # Business logic and API clients

│   ├── dataService.js       # Main data orchestration│  │  │dataServ │ │  geminiAI   │ │                           │

│   ├── geminiAI.js          # Gemini AI integration

│   ├── firebase.js          # Firebase initialization## 🔌 API Integration│  │  │  ice    │ │   Service   │ │                           │

│   ├── firebaseAnalytics.js # Analytics tracking

│   ├── nwicService.js       # NWIC API client│  │  └────┬────┘ └──────┬──────┘ │                           │

│   └── governmentAPI.js     # Legacy government APIs

│### National Water Informatics Centre (NWIC)│  │       │             │        │                           │

├── store/                   # State management

│   ├── AuthContext.js       # Authentication state│  │  ┌────┴────┐ ┌──────┴──────┐ │                           │

│   └── ThemeContext.js      # Theme state

│AquaIntel integrates with NWIC's public CKAN datastore API for:│  │  │  NWIC   │ │   Gemini    │ │                           │

├── navigation/              # App navigation structure

│   ├── RootNavigator.jsx    # Root navigation container- Groundwater station data│  │  │  APIs   │ │   Flash 2.5 │ │                           │

│   ├── AuthNavigator.jsx    # Auth flow navigator

│   ├── AppNavigator.jsx     # Main app navigator- Water level time series│  │  └─────────┘ └─────────────┘ │                           │

│   └── DrawerNavigator.jsx  # Drawer menu

│- Rainfall data│  └──────────────────────────────┘                           │

├── data/                    # Mock data for demos

│   ├── mockStations.js- Water quality parameters│                                                              │

│   ├── mockTimeSeriesData.js

│   ├── mockRainfallData.js│  ┌──────────────────────────────┐                           │

│   └── mockPredictions.js

│### Google Gemini AI│  │       State Management        │                           │

├── constants/               # App constants

│   └── theme.js│  │  AuthContext + ThemeContext  │                           │

│

├── utils/                   # Helper functionsThe AI assistant uses Gemini Flash 2.5 for:│  └──────────────────────────────┘                           │

│   ├── animations.js

│   └── theme.js- Natural language understanding└─────────────────────────────────────────────────────────────┘

│

├── assets/                  # Images, fonts, icons- Context-aware water management advice                           │

│   └── logo.png

│- Regional crop and irrigation guidance                           ▼

├── .env                     # Environment variables (not in git)

├── .env.example             # Environment template┌─────────────────────────────────────────────────────────────┐

├── app.json                 # Expo configuration

├── App.js                   # App entry point---│                    External Services                         │

└── package.json             # Dependencies

```│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │



---## 🗺️ Roadmap│  │  Firebase   │  │    NWIC     │  │    Google Gemini    │  │



## 🗺️ Roadmap│  │Auth+Firestr │  │  Data APIs  │  │     Flash 2.5       │  │



### ✅ Completed- [x] Core dashboard with real-time data│  └─────────────┘  └─────────────┘  └─────────────────────┘  │

- [x] Core dashboard with real-time data visualization

- [x] NWIC API integration with fallback system- [x] NWIC API integration└─────────────────────────────────────────────────────────────┘

- [x] AI Assistant powered by Gemini Flash 2.5

- [x] Cross-platform map support (native + web)- [x] AI Assistant with Gemini Flash 2.5```

- [x] Firebase authentication (Email + Google Sign-In)

- [x] Web deployment on Vercel- [x] Cross-platform map support

- [x] Markdown rendering in AI chat

- [x] Theme support (Light/Dark mode)- [x] Firebase authentication---

- [x] Responsive design for mobile and web

- [x] Web deployment (Vercel)

### 🚧 In Progress

- [ ] Push notifications for water level alerts- [x] Markdown rendering in AI chat## 🚀 Getting Started

- [ ] Offline data caching with background sync

- [ ] User-generated reports and community features- [ ] Push notifications for alerts



### 📅 Planned- [ ] Offline data caching with sync### Prerequisites

- [ ] Multi-language support (Hindi, Tamil, Telugu, Bengali)

- [ ] Advanced ML predictions for water levels- [ ] Multi-language support (Hindi, regional)

- [ ] Integration with more government data sources

- [ ] Weather forecast integration- [ ] Advanced ML predictions- **Node.js** 18+

- [ ] Export data as PDF/Excel reports

- [ ] Admin dashboard for data management- [ ] Community reporting system- **npm** or **yarn**



---- **Expo CLI**: `npm install -g @expo/cli`



## 🤝 Contributing---- **Android Studio** (for Android development)



Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.- **Xcode** (for iOS development, macOS only)



### How to Contribute## 📁 Project Structure



1. **Fork the Project**### Installation

2. **Create your Feature Branch**

   ```bash````

   git checkout -b feature/AmazingFeature

   ```AquaIntel/1. **Clone the repository**

3. **Commit your Changes**

   ```bash├── components/ # Reusable UI components

   git commit -m 'Add some AmazingFeature'

   ```│ ├── AIAssistant.jsx # AI chat interface ```bash

4. **Push to the Branch**

   ```bash│ ├── DataCard.jsx # Dashboard cards git clone https://github.com/IndAlok/AquaIntel.git

   git push origin feature/AmazingFeature

   ```│ └── WaterLevelChart.jsx cd AquaIntel

5. **Open a Pull Request**

├── screens/ ```

### Development Guidelines

│ ├── auth/ # Login, Signup, Onboarding

- Follow the existing code style and conventions

- Write meaningful commit messages│ └── main/ # Dashboard, Map, Settings2. **Install dependencies**

- Test on both mobile (iOS/Android) and web platforms

- Update documentation for any new features├── services/

- **Never commit API keys or secrets** - use `.env` files

│ ├── dataService.js # Data orchestration ```bash

---

│ ├── geminiAI.js # AI integration npm install

## 📄 License

│ ├── firebase.js # Firebase config ```

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

│ └── nwicService.js # NWIC API client

---

├── store/3. **Configure environment variables**

## 👨‍💻 Author

│ ├── AuthContext.js # Auth state

**Alok**

│ └── ThemeContext.js # Theme state ```bash

- GitHub: [@IndAlok](https://github.com/IndAlok)

- Project Link: [https://github.com/IndAlok/AquaIntel](https://github.com/IndAlok/AquaIntel)├── data/ # Mock data for demos cp .env.example .env

- Live Demo: [https://aquaintel-indalok.vercel.app/](https://aquaintel-indalok.vercel.app/)

└── navigation/ # App navigation # Edit .env with your API keys

---

`   `

## 🙏 Acknowledgments

---4. **Start the development server**

- **Ministry of Jal Shakti** - For groundwater conservation initiatives

- **NWIC (National Water Informatics Centre)** - For open data APIs## 🤝 Contributing ```bash

- **Google Gemini AI** - For powerful AI capabilities

- **Expo Team** - For excellent cross-platform toolsnpm start

- **Open Source Community** - For amazing libraries and support

Contributions are welcome! Please follow these steps: ```

---

1. Fork the repository5. **Run on platform**

<div align="center">

2. Create a feature branch (`git checkout -b feature/AmazingFeature`) ```bash

### ⭐ Star this repository if you found it helpful!

3. Commit your changes (`git commit -m 'Add AmazingFeature'`) npm run android # Android

**Made with ❤️ for India's Water Security**

4. Push to the branch (`git push origin feature/AmazingFeature`) npm run ios # iOS (macOS only)

[🔝 Back to Top](#-aquaintel)

5. Open a Pull Request npm run web # Web browser

</div>

   ```

   ```

---

---

## 📄 License

## 🔐 Environment Variables

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Create a `.env` file in the project root:

---

```env

## 👨‍💻 Author# Firebase Configuration

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key

**Alok** - [@IndAlok](https://github.com/IndAlok)EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

---EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

⭐ **Star this repository if you found it helpful!**EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id



*Made with ❤️ for India's Water Security*# Google Gemini AI

EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Data Configuration
EXPO_PUBLIC_USE_REAL_DATA=true
EXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search

# NWIC Resource IDs
EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=your_resource_id
EXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=your_resource_id
EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=your_resource_id
EXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=your_resource_id
```

> ⚠️ **Security Note**: Never commit `.env` files to version control. The repository includes `.env.example` as a template.

---

## 🌐 Deployment

### Web (Vercel)

1. **Build for web**

   ```bash
   npx expo export --platform web
   ```

2. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

3. **Configure Firebase Authorized Domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to Authorized domains

### Mobile (EAS Build)

1. **Configure EAS**

   ```bash
   eas build:configure
   ```

2. **Build for Android**

   ```bash
   eas build --platform android
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

---

## 🔌 API Integration

### National Water Informatics Centre (NWIC)

AquaIntel integrates with NWIC's public CKAN datastore API:

| Endpoint           | Data                     |
| ------------------ | ------------------------ |
| `datastore_search` | Groundwater stations     |
| `datastore_search` | Water level time series  |
| `datastore_search` | Rainfall data            |
| `datastore_search` | Water quality parameters |

### Google Gemini AI

The AI assistant uses Gemini Flash 2.5 for:

- Natural language understanding
- Context-aware water management advice
- Regional crop and irrigation guidance

---

## 📸 Screenshots

<div align="center">

|       Dashboard        |      Station Map       |    AI Assistant     |
| :--------------------: | :--------------------: | :-----------------: |
| Real-time water levels | Interactive clustering | Gemini-powered chat |

| Station Details |  Forecasts  |   Settings   |
| :-------------: | :---------: | :----------: |
| Charts & trends | Predictions | Theme toggle |

</div>

---

## 🗺️ Roadmap

- [x] Core dashboard with real-time data
- [x] NWIC API integration
- [x] AI Assistant with Gemini Flash 2.5
- [x] Cross-platform map support
- [x] Firebase authentication
- [x] Web deployment (Vercel)
- [x] Markdown rendering in AI chat
- [ ] Push notifications for alerts
- [ ] Offline data caching with sync
- [ ] Multi-language support (Hindi, regional)
- [ ] Advanced ML predictions
- [ ] Community reporting system

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test on both mobile and web platforms
- Never commit API keys or secrets

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Alok**

- GitHub: [@IndAlok](https://github.com/IndAlok)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ for India's Water Security

</div>
