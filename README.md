<div align="center"><div align="center">



# 💧 AquaIntel# AquaIntel



### AI-Powered Groundwater Intelligence Platform for IndiaGroundwater intelligence for India (Expo React Native)



[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)</div>

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)

[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)---

[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)## Overview



**[Live Demo](https://aquaintel.vercel.app)** · **[Report Bug](https://github.com/IndAlok/AquaIntel/issues)** · **[Request Feature](https://github.com/IndAlok/AquaIntel/issues)**AquaIntel is an Expo-based React Native app that visualizes groundwater and rainfall data for India. It can use live data from the National Water Informatics Centre (NWIC) when enabled, and falls back to high-fidelity mock data for offline/demo use. Authentication and analytics are optional and powered by Firebase when configured.



<img src="assets/logo.png" alt="AquaIntel Logo" width="120" />> Deployment note: This is a mobile-first Expo project. Publish via Expo (EAS/Expo Go) or native builds. Netlify/Vercel are not appropriate targets unless you intentionally build the experimental Expo web bundle.



</div>## What works today



---- Dashboard with loading/error/empty states and data-source badges

- Station list/detail with charts using either NWIC data or mocks

## 📋 Table of Contents- Rainfall and groundwater time series (NWIC → fallback)

- Water quality fetch (NWIC → fallback synthetic values)

- [About](#-about)- Derived state stats and drought heuristics (from NWIC aggregates when enabled)

- [Features](#-features)- Auth flow (Firebase email/password) that gracefully disables if config is missing

- [Tech Stack](#-tech-stack)

- [Architecture](#-architecture)Simulated/placeholder pieces:

- [Getting Started](#-getting-started)

- [Environment Variables](#-environment-variables)- AI predictions and risk insights are mock-generated

- [Deployment](#-deployment)- Notifications/offline sync are not yet implemented

- [API Integration](#-api-integration)- Community reporting UI exists but uses mock flows

- [Screenshots](#-screenshots)

- [Roadmap](#-roadmap)## Tech stack

- [Contributing](#-contributing)

- [License](#-license)- React Native 0.81 / Expo SDK 54

- React Navigation, React Native Paper, Victory Native, React Native Maps

---- Firebase (Auth optional) with graceful noop when not configured

- NWIC datastore_search (public) via `services/nwicService.js` (uses hardcoded resource IDs; no HTML scraping to keep native/web compatibility)

## 🌊 About- Mock data under `data/` for safe demos



**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using React Native and Expo, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.## Environment setup



The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's Gemini Flash 2.5 model to provide personalized water management advice.Create a `.env` (gitignored) using the template below. Leave values blank if you don’t want that service enabled.



### 🎯 Problem Statement```

# Firebase (optional)

India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:EXPO_PUBLIC_FIREBASE_API_KEY=

EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=

- **Democratizing access** to groundwater data for farmers, officials, and citizensEXPO_PUBLIC_FIREBASE_PROJECT_ID=

- **Providing actionable insights** through AI-powered analysisEXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=

- **Enabling informed decision-making** for irrigation, conservation, and policyEXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

EXPO_PUBLIC_FIREBASE_APP_ID=

---EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=



## ✨ Features# Demo login (optional)

EXPO_PUBLIC_DEMO_EMAIL=

### 📊 Dashboard & AnalyticsEXPO_PUBLIC_DEMO_PASSWORD=

- Real-time groundwater level monitoring across 1000+ stations

- Interactive charts and trend analysis using Victory Native# NWIC data (set to true to hit live API)

- State and district-level statistics aggregationEXPO_PUBLIC_USE_REAL_DATA=false

- Critical/Warning/Normal status indicatorsEXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search

EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=

### 🗺️ Interactive MapsEXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=

- Cross-platform map support (React Native Maps for mobile, Leaflet for web)EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=

- Station clustering and filtering by statusEXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=

- Geolocation-based nearest station discoveryEXPO_PUBLIC_NWIC_STATE_STATS_RESOURCE_ID=

EXPO_PUBLIC_NWIC_DROUGHT_RESOURCE_ID=

### 🤖 AquaIntel AI AssistantEXPO_PUBLIC_NWIC_PREDICTION_RESOURCE_ID=SIMULATED

- Powered by **Google Gemini Flash 2.5**```

- Context-aware responses based on user's location and data

- **Markdown rendering** for formatted AI responsesSecurity defaults:

- Quick questions and smart suggestions

- Chat history persistence- `.env` and `.env.local` are already gitignored.

- The repo contains **no live keys**; supply your own before production.

### 🔐 Authentication

- Firebase Authentication (Email/Password + Google Sign-In)## Running locally

- Secure token refresh and session management

- User profile with Firestore integration```bash

npm install

### 📱 Cross-Platformnpm start           # starts Expo dev server

- **iOS** and **Android** native apps via Exponpm run android     # open on Android emulator/device

- **Web** deployment with responsive designnpm run web         # experimental web build (not production hardened)

- Platform-specific optimizations (maps, animations)```



### 🌙 Theme Support## Deployment guidance

- Light and Dark mode with system preference detection

- Consistent Material Design 3 styling via React Native Paper- **Recommended:** Use Expo EAS to build/publish mobile apps. This project is optimized for devices, not static hosting.

- **Not recommended:** Netlify/Vercel static hosting. Expo web can be built, but React Native-specific modules (maps, reanimated, native Firebase) are not tuned for a production web experience.

---

## Data sources and fallbacks

## 🛠️ Tech Stack

- Primary live data: NWIC `datastore_search` (public). Configurable via `.env`.

### Frontend- Secondary legacy APIs: placeholders in `governmentAPI.js` (only used if enabled).

| Technology | Purpose |- Fallback: Mock datasets in `data/` keep the app usable offline or without credentials.

|------------|---------|

| **React Native 0.81** | Cross-platform mobile framework |## Project structure (high level)

| **Expo SDK 54** | Development and build toolchain |

| **React Navigation 7** | Navigation (Drawer + Stack) |```

| **React Native Paper 5** | Material Design 3 UI components |components/        Reusable UI

| **Victory Native** | Data visualization and charts |screens/           Auth + main feature screens

| **React Native Maps** | Native map integration (mobile) |services/          Data adapters (nwicService, dataService, firebase, etc.)

| **React-Leaflet** | Web map integration |data/              Mock datasets

| **React Native Reanimated 3** | Smooth animations |store/             Context providers (auth/theme)

utils/             Helpers (animations, theme)

### Backend & Services```

| Technology | Purpose |

|------------|---------|## Roadmap (truthful)

| **Firebase Auth** | User authentication |

| **Cloud Firestore** | User profiles and data storage |- [x] NWIC integration with national aggregation + graceful fallbacks

| **Google Gemini AI** | AI assistant capabilities |- [x] Mock-friendly dashboards and station detail views

| **NWIC APIs** | Live groundwater data |- [ ] Harden Expo web or provide dedicated web client

- [ ] Real push notifications and offline cache/sync

### DevOps- [ ] Replace mock AI predictions with a real model/service

| Technology | Purpose |- [ ] Expand NWIC resource coverage list and caching window

|------------|---------|

| **Vercel** | Web deployment and hosting |## Contributing

| **EAS Build** | Native app builds |

| **GitHub Actions** | CI/CD pipeline |Pull requests are welcome. Please avoid committing secrets; use `.env` locally and keep keys out of Git history.



---## License



## 🏗️ ArchitectureMIT. See `LICENSE`.


```
┌─────────────────────────────────────────────────────────────┐
│                        AquaIntel App                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Screens   │  │ Components  │  │     Navigation      │  │
│  │  Dashboard  │  │  AIAssist   │  │  Drawer + Stack     │  │
│  │    Maps     │  │   Charts    │  │                     │  │
│  │  Stations   │  │   Cards     │  │                     │  │
│  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘  │
│         │                │                                   │
│  ┌──────┴────────────────┴──────┐                           │
│  │         Services Layer        │                           │
│  │  ┌─────────┐ ┌─────────────┐ │                           │
│  │  │dataServ │ │  geminiAI   │ │                           │
│  │  │  ice    │ │   Service   │ │                           │
│  │  └────┬────┘ └──────┬──────┘ │                           │
│  │       │             │        │                           │
│  │  ┌────┴────┐ ┌──────┴──────┐ │                           │
│  │  │  NWIC   │ │   Gemini    │ │                           │
│  │  │  APIs   │ │   Flash 2.5 │ │                           │
│  │  └─────────┘ └─────────────┘ │                           │
│  └──────────────────────────────┘                           │
│                                                              │
│  ┌──────────────────────────────┐                           │
│  │       State Management        │                           │
│  │  AuthContext + ThemeContext  │                           │
│  └──────────────────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Firebase   │  │    NWIC     │  │    Google Gemini    │  │
│  │Auth+Firestr │  │  Data APIs  │  │     Flash 2.5       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IndAlok/AquaIntel.git
   cd AquaIntel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on platform**
   ```bash
   npm run android    # Android
   npm run ios        # iOS (macOS only)
   npm run web        # Web browser
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
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

| Endpoint | Data |
|----------|------|
| `datastore_search` | Groundwater stations |
| `datastore_search` | Water level time series |
| `datastore_search` | Rainfall data |
| `datastore_search` | Water quality parameters |

### Google Gemini AI

The AI assistant uses Gemini Flash 2.5 for:
- Natural language understanding
- Context-aware water management advice
- Regional crop and irrigation guidance

---

## 📸 Screenshots

<div align="center">

| Dashboard | Station Map | AI Assistant |
|:---------:|:-----------:|:------------:|
| Real-time water levels | Interactive clustering | Gemini-powered chat |

| Station Details | Forecasts | Settings |
|:---------------:|:---------:|:--------:|
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
