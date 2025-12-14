# 💧 AquaIntel<div align="center"><div align="center">



**AI-Powered Groundwater Intelligence Platform for India**# 💧 AquaIntel# AquaIntel



[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)### AI-Powered Groundwater Intelligence Platform for IndiaGroundwater intelligence for India (Expo React Native)

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)

[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)</div>

[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)



🔗 **[Live Demo](https://aquaintel-indalok.vercel.app/)** · [Report Bug](https://github.com/IndAlok/AquaIntel/issues) · [Request Feature](https://github.com/IndAlok/AquaIntel/issues)[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)---



---[![Gemini AI](https://img.shields.io/badge/Gemini-Flash%202.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)



## 🌊 About[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)## Overview



**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using React Native and Expo, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.**[Live Demo](https://aquaintel.vercel.app)** · **[Report Bug](https://github.com/IndAlok/AquaIntel/issues)** · **[Request Feature](https://github.com/IndAlok/AquaIntel/issues)**AquaIntel is an Expo-based React Native app that visualizes groundwater and rainfall data for India. It can use live data from the National Water Informatics Centre (NWIC) when enabled, and falls back to high-fidelity mock data for offline/demo use. Authentication and analytics are optional and powered by Firebase when configured.



The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's Gemini Flash 2.5 model to provide personalized water management advice.<img src="assets/logo.png" alt="AquaIntel Logo" width="120" />> Deployment note: This is a mobile-first Expo project. Publish via Expo (EAS/Expo Go) or native builds. Netlify/Vercel are not appropriate targets unless you intentionally build the experimental Expo web bundle.



### 🎯 Problem Statement</div>## What works today



India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:---- Dashboard with loading/error/empty states and data-source badges



- **Democratizing access** to groundwater data for farmers, officials, and citizens- Station list/detail with charts using either NWIC data or mocks

- **Providing actionable insights** through AI-powered analysis

- **Enabling informed decision-making** for irrigation, conservation, and policy## 📋 Table of Contents- Rainfall and groundwater time series (NWIC → fallback)



---- Water quality fetch (NWIC → fallback synthetic values)



## ✨ Features- [About](#-about)- Derived state stats and drought heuristics (from NWIC aggregates when enabled)



### 📊 Dashboard & Analytics- [Features](#-features)- Auth flow (Firebase email/password) that gracefully disables if config is missing

- Real-time groundwater level monitoring across 1000+ stations

- Interactive charts and trend analysis using Victory Native- [Tech Stack](#-tech-stack)

- State and district-level statistics aggregation

- Critical/Warning/Normal status indicators- [Architecture](#-architecture)Simulated/placeholder pieces:



### 🗺️ Interactive Maps- [Getting Started](#-getting-started)

- Cross-platform map support (React Native Maps for mobile, Leaflet for web)

- Station clustering and filtering by status- [Environment Variables](#-environment-variables)- AI predictions and risk insights are mock-generated

- Geolocation-based nearest station discovery

- [Deployment](#-deployment)- Notifications/offline sync are not yet implemented

### 🤖 AquaIntel AI Assistant

- Powered by **Google Gemini Flash 2.5**- [API Integration](#-api-integration)- Community reporting UI exists but uses mock flows

- Context-aware responses based on user's location and data

- Markdown rendering for formatted AI responses- [Screenshots](#-screenshots)

- Quick questions and smart suggestions

- Chat history persistence- [Roadmap](#-roadmap)## Tech stack



### 🔐 Authentication- [Contributing](#-contributing)

- Firebase Authentication (Email/Password + Google Sign-In)

- Secure token refresh and session management- [License](#-license)- React Native 0.81 / Expo SDK 54

- User profile with Firestore integration

- React Navigation, React Native Paper, Victory Native, React Native Maps

### 📱 Cross-Platform

- iOS and Android native apps via Expo---- Firebase (Auth optional) with graceful noop when not configured

- Web deployment with responsive design

- Platform-specific optimizations (maps, animations)- NWIC datastore_search (public) via `services/nwicService.js` (uses hardcoded resource IDs; no HTML scraping to keep native/web compatibility)



### 🌙 Theme Support## 🌊 About- Mock data under `data/` for safe demos

- Light and Dark mode with system preference detection

- Consistent Material Design 3 styling via React Native Paper**AquaIntel** is a comprehensive groundwater monitoring and management platform designed for India's water resource sector. Built as a cross-platform solution using React Native and Expo, it provides real-time insights into groundwater levels, rainfall patterns, and water quality across India.## Environment setup



---The platform integrates with **National Water Informatics Centre (NWIC)** APIs to fetch live data and features an **AI-powered assistant** using Google's Gemini Flash 2.5 model to provide personalized water management advice.Create a `.env` (gitignored) using the template below. Leave values blank if you don’t want that service enabled.



## 🛠️ Tech Stack### 🎯 Problem Statement```



### Frontend# Firebase (optional)

| Technology | Purpose |

|------------|---------|India faces a critical groundwater crisis with over 50% of the country's districts facing water stress. AquaIntel addresses this by:EXPO_PUBLIC_FIREBASE_API_KEY=

| React Native 0.81 | Cross-platform mobile framework |

| Expo SDK 54 | Development and build toolchain |EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=

| React Navigation 7 | Navigation (Drawer + Stack) |

| React Native Paper 5 | Material Design 3 UI components |- **Democratizing access** to groundwater data for farmers, officials, and citizensEXPO_PUBLIC_FIREBASE_PROJECT_ID=

| Victory Native | Data visualization and charts |

| React Native Maps | Native map integration (mobile) |- **Providing actionable insights** through AI-powered analysisEXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=

| React-Leaflet | Web map integration |

| React Native Reanimated 3 | Smooth animations |- **Enabling informed decision-making** for irrigation, conservation, and policyEXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=



### Backend & ServicesEXPO_PUBLIC_FIREBASE_APP_ID=

| Technology | Purpose |

|------------|---------|---EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=

| Firebase Auth | User authentication |

| Cloud Firestore | User profiles and data storage |## ✨ Features# Demo login (optional)

| Google Gemini AI | AI assistant capabilities |

| NWIC APIs | Live groundwater data |EXPO_PUBLIC_DEMO_EMAIL=



### DevOps### 📊 Dashboard & AnalyticsEXPO_PUBLIC_DEMO_PASSWORD=

| Technology | Purpose |

|------------|---------|- Real-time groundwater level monitoring across 1000+ stations

| Vercel | Web deployment and hosting |

| EAS Build | Native app builds |- Interactive charts and trend analysis using Victory Native# NWIC data (set to true to hit live API)



---- State and district-level statistics aggregationEXPO_PUBLIC_USE_REAL_DATA=false



## 🏗️ Architecture- Critical/Warning/Normal status indicatorsEXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search



```EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=

┌─────────────────────────────────────────────────────────────┐

│                        AquaIntel App                        │### 🗺️ Interactive MapsEXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=

├─────────────────────────────────────────────────────────────┤

│                                                             │- Cross-platform map support (React Native Maps for mobile, Leaflet for web)EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=

│  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  │

│  │  Screens  │  │Components │  │      Navigation         │  │- Station clustering and filtering by statusEXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=

│  │ Dashboard │  │ AIAssist  │  │    Drawer + Stack       │  │

│  │   Maps    │  │  Charts   │  │                         │  │- Geolocation-based nearest station discoveryEXPO_PUBLIC_NWIC_STATE_STATS_RESOURCE_ID=

│  │ Stations  │  │   Cards   │  │                         │  │

│  └─────┬─────┘  └─────┬─────┘  └─────────────────────────┘  │EXPO_PUBLIC_NWIC_DROUGHT_RESOURCE_ID=

│        │              │                                     │

│  ┌─────┴──────────────┴─────┐                               │### 🤖 AquaIntel AI AssistantEXPO_PUBLIC_NWIC_PREDICTION_RESOURCE_ID=SIMULATED

│  │      Services Layer      │                               │

│  │  dataService  geminiAI   │                               │- Powered by **Google Gemini Flash 2.5**```

│  │  nwicService  firebase   │                               │

│  └─────────────┬────────────┘                               │- Context-aware responses based on user's location and data

│                │                                            │

│  ┌─────────────┴────────────┐                               │- **Markdown rendering** for formatted AI responsesSecurity defaults:

│  │    State Management      │                               │

│  │ AuthContext ThemeContext │                               │- Quick questions and smart suggestions

│  └──────────────────────────┘                               │

│                                                             │- Chat history persistence- `.env` and `.env.local` are already gitignored.

└─────────────────────────────────────────────────────────────┘

                            │- The repo contains **no live keys**; supply your own before production.

                            ▼

┌─────────────────────────────────────────────────────────────┐### 🔐 Authentication

│                    External Services                        │

│  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  │- Firebase Authentication (Email/Password + Google Sign-In)## Running locally

│  │  Firebase │  │   NWIC    │  │    Google Gemini AI     │  │

│  │Auth+Store │  │ Data APIs │  │      Flash 2.5          │  │- Secure token refresh and session management

│  └───────────┘  └───────────┘  └─────────────────────────┘  │

└─────────────────────────────────────────────────────────────┘- User profile with Firestore integration```bash

```

npm install

---

### 📱 Cross-Platformnpm start # starts Expo dev server

## 🚀 Getting Started

- **iOS** and **Android** native apps via Exponpm run android # open on Android emulator/device

### Prerequisites

- **Web** deployment with responsive designnpm run web # experimental web build (not production hardened)

- Node.js 18+

- npm or yarn- Platform-specific optimizations (maps, animations)```

- Expo CLI: `npm install -g @expo/cli`

- Android Studio (for Android development)### 🌙 Theme Support## Deployment guidance

- Xcode (for iOS development, macOS only)

- Light and Dark mode with system preference detection

### Installation

- Consistent Material Design 3 styling via React Native Paper- **Recommended:** Use Expo EAS to build/publish mobile apps. This project is optimized for devices, not static hosting.

1. **Clone the repository**

```bash- **Not recommended:** Netlify/Vercel static hosting. Expo web can be built, but React Native-specific modules (maps, reanimated, native Firebase) are not tuned for a production web experience.

git clone https://github.com/IndAlok/AquaIntel.git

cd AquaIntel---

```

## Data sources and fallbacks

2. **Install dependencies**

```bash## 🛠️ Tech Stack

npm install

```- Primary live data: NWIC `datastore_search` (public). Configurable via `.env`.



3. **Configure environment variables**### Frontend- Secondary legacy APIs: placeholders in `governmentAPI.js` (only used if enabled).

```bash

cp .env.example .env| Technology | Purpose |- Fallback: Mock datasets in `data/` keep the app usable offline or without credentials.

# Edit .env with your API keys

```|------------|---------|



4. **Start the development server**| **React Native 0.81** | Cross-platform mobile framework |## Project structure (high level)

```bash

npm start| **Expo SDK 54** | Development and build toolchain |

```

| **React Navigation 7** | Navigation (Drawer + Stack) |```

5. **Run on platform**

```bash| **React Native Paper 5** | Material Design 3 UI components |components/ Reusable UI

npm run android    # Android

npm run ios        # iOS (macOS only)| **Victory Native** | Data visualization and charts |screens/ Auth + main feature screens

npm run web        # Web browser

```| **React Native Maps** | Native map integration (mobile) |services/ Data adapters (nwicService, dataService, firebase, etc.)



---| **React-Leaflet** | Web map integration |data/ Mock datasets



## 🔐 Environment Variables| **React Native Reanimated 3** | Smooth animations |store/ Context providers (auth/theme)



Create a `.env` file in the project root:utils/ Helpers (animations, theme)



```env### Backend & Services```

# Firebase Configuration

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key| Technology | Purpose |

EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id|------------|---------|## Roadmap (truthful)

EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id| **Firebase Auth** | User authentication |

EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

| **Cloud Firestore** | User profiles and data storage |- [x] NWIC integration with national aggregation + graceful fallbacks

# Google Gemini AI

EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key| **Google Gemini AI** | AI assistant capabilities |- [x] Mock-friendly dashboards and station detail views



# Data Configuration| **NWIC APIs** | Live groundwater data |- [ ] Harden Expo web or provide dedicated web client

EXPO_PUBLIC_USE_REAL_DATA=true

EXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search- [ ] Real push notifications and offline cache/sync

```

### DevOps- [ ] Replace mock AI predictions with a real model/service

> ⚠️ **Security Note**: Never commit `.env` files to version control.

| Technology | Purpose |- [ ] Expand NWIC resource coverage list and caching window

---

|------------|---------|

## 🌐 Deployment

| **Vercel** | Web deployment and hosting |## Contributing

### Web (Vercel)

| **EAS Build** | Native app builds |

1. Build for web:

```bash| **GitHub Actions** | CI/CD pipeline |Pull requests are welcome. Please avoid committing secrets; use `.env` locally and keep keys out of Git history.

npx expo export --platform web

```---## License



2. Deploy to Vercel:## 🏗️ ArchitectureMIT. See `LICENSE`.

```bash

vercel --prod```

```┌─────────────────────────────────────────────────────────────┐

│                        AquaIntel App                        │

3. Add your Vercel domain to Firebase Console → Authentication → Settings → Authorized domains├─────────────────────────────────────────────────────────────┤

│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │

### Mobile (EAS Build)│  │   Screens   │  │ Components  │  │     Navigation      │  │

│  │  Dashboard  │  │  AIAssist   │  │  Drawer + Stack     │  │

```bash│  │    Maps     │  │   Charts    │  │                     │  │

eas build:configure│  │  Stations   │  │   Cards     │  │                     │  │

eas build --platform android│  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘  │

eas build --platform ios│         │                │                                   │

```│  ┌──────┴────────────────┴──────┐                           │

│  │         Services Layer        │                           │

---│  │  ┌─────────┐ ┌─────────────┐ │                           │

│  │  │dataServ │ │  geminiAI   │ │                           │

## 🔌 API Integration│  │  │  ice    │ │   Service   │ │                           │

│  │  └────┬────┘ └──────┬──────┘ │                           │

### National Water Informatics Centre (NWIC)│  │       │             │        │                           │

│  │  ┌────┴────┐ ┌──────┴──────┐ │                           │

AquaIntel integrates with NWIC's public CKAN datastore API for:│  │  │  NWIC   │ │   Gemini    │ │                           │

- Groundwater station data│  │  │  APIs   │ │   Flash 2.5 │ │                           │

- Water level time series│  │  └─────────┘ └─────────────┘ │                           │

- Rainfall data│  └──────────────────────────────┘                           │

- Water quality parameters│                                                              │

│  ┌──────────────────────────────┐                           │

### Google Gemini AI│  │       State Management        │                           │

│  │  AuthContext + ThemeContext  │                           │

The AI assistant uses Gemini Flash 2.5 for:│  └──────────────────────────────┘                           │

- Natural language understanding└─────────────────────────────────────────────────────────────┘

- Context-aware water management advice                           │

- Regional crop and irrigation guidance                           ▼

┌─────────────────────────────────────────────────────────────┐

---│                    External Services                         │

│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │

## 🗺️ Roadmap│  │  Firebase   │  │    NWIC     │  │    Google Gemini    │  │

│  │Auth+Firestr │  │  Data APIs  │  │     Flash 2.5       │  │

- [x] Core dashboard with real-time data│  └─────────────┘  └─────────────┘  └─────────────────────┘  │

- [x] NWIC API integration└─────────────────────────────────────────────────────────────┘

- [x] AI Assistant with Gemini Flash 2.5```

- [x] Cross-platform map support

- [x] Firebase authentication---

- [x] Web deployment (Vercel)

- [x] Markdown rendering in AI chat## 🚀 Getting Started

- [ ] Push notifications for alerts

- [ ] Offline data caching with sync### Prerequisites

- [ ] Multi-language support (Hindi, regional)

- [ ] Advanced ML predictions- **Node.js** 18+

- [ ] Community reporting system- **npm** or **yarn**

- **Expo CLI**: `npm install -g @expo/cli`

---- **Android Studio** (for Android development)

- **Xcode** (for iOS development, macOS only)

## 📁 Project Structure

### Installation

```

AquaIntel/1. **Clone the repository**

├── components/          # Reusable UI components

│   ├── AIAssistant.jsx  # AI chat interface   ```bash

│   ├── DataCard.jsx     # Dashboard cards   git clone https://github.com/IndAlok/AquaIntel.git

│   └── WaterLevelChart.jsx   cd AquaIntel

├── screens/   ```

│   ├── auth/            # Login, Signup, Onboarding

│   └── main/            # Dashboard, Map, Settings2. **Install dependencies**

├── services/

│   ├── dataService.js   # Data orchestration   ```bash

│   ├── geminiAI.js      # AI integration   npm install

│   ├── firebase.js      # Firebase config   ```

│   └── nwicService.js   # NWIC API client

├── store/3. **Configure environment variables**

│   ├── AuthContext.js   # Auth state

│   └── ThemeContext.js  # Theme state   ```bash

├── data/                # Mock data for demos   cp .env.example .env

└── navigation/          # App navigation   # Edit .env with your API keys

```   ```



---4. **Start the development server**



## 🤝 Contributing   ```bash

   npm start

Contributions are welcome! Please follow these steps:   ```



1. Fork the repository5. **Run on platform**

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)   ```bash

3. Commit your changes (`git commit -m 'Add AmazingFeature'`)   npm run android    # Android

4. Push to the branch (`git push origin feature/AmazingFeature`)   npm run ios        # iOS (macOS only)

5. Open a Pull Request   npm run web        # Web browser

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
