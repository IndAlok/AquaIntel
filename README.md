<div align="center">

# AquaIntel

Groundwater intelligence for India (Expo React Native)

</div>

---

## Overview

AquaIntel is an Expo-based React Native app that visualizes groundwater and rainfall data for India. It can use live data from the National Water Informatics Centre (NWIC) when enabled, and falls back to high-fidelity mock data for offline/demo use. Authentication and analytics are optional and powered by Firebase when configured.

> Deployment note: This is a mobile-first Expo project. Publish via Expo (EAS/Expo Go) or native builds. Netlify/Vercel are not appropriate targets unless you intentionally build the experimental Expo web bundle.

## What works today

- Dashboard with loading/error/empty states and data-source badges
- Station list/detail with charts using either NWIC data or mocks
- Rainfall and groundwater time series (NWIC → fallback)
- Water quality fetch (NWIC → fallback synthetic values)
- Derived state stats and drought heuristics (from NWIC aggregates when enabled)
- Auth flow (Firebase email/password) that gracefully disables if config is missing

Simulated/placeholder pieces:

- AI predictions and risk insights are mock-generated
- Notifications/offline sync are not yet implemented
- Community reporting UI exists but uses mock flows

## Tech stack

- React Native 0.81 / Expo SDK 54
- React Navigation, React Native Paper, Victory Native, React Native Maps
- Firebase (Auth optional) with graceful noop when not configured
- NWIC datastore_search (public) via `services/nwicService.js` (uses hardcoded resource IDs; no HTML scraping to keep native/web compatibility)
- Mock data under `data/` for safe demos

## Environment setup

Create a `.env` (gitignored) using the template below. Leave values blank if you don’t want that service enabled.

```
# Firebase (optional)
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Demo login (optional)
EXPO_PUBLIC_DEMO_EMAIL=
EXPO_PUBLIC_DEMO_PASSWORD=

# NWIC data (set to true to hit live API)
EXPO_PUBLIC_USE_REAL_DATA=false
EXPO_PUBLIC_NWIC_API_URL=https://nwdp.nwic.gov.in/api/action/datastore_search
EXPO_PUBLIC_NWIC_STATIONS_RESOURCE_ID=
EXPO_PUBLIC_NWIC_GW_LEVEL_TS_RESOURCE_ID=
EXPO_PUBLIC_NWIC_RAINFALL_RESOURCE_ID=
EXPO_PUBLIC_NWIC_WATER_QUALITY_RESOURCE_ID=
EXPO_PUBLIC_NWIC_STATE_STATS_RESOURCE_ID=
EXPO_PUBLIC_NWIC_DROUGHT_RESOURCE_ID=
EXPO_PUBLIC_NWIC_PREDICTION_RESOURCE_ID=SIMULATED
```

Security defaults:

- `.env` and `.env.local` are already gitignored.
- The repo contains **no live keys**; supply your own before production.

## Running locally

```bash
npm install
npm start           # starts Expo dev server
npm run android     # open on Android emulator/device
npm run web         # experimental web build (not production hardened)
```

## Deployment guidance

- **Recommended:** Use Expo EAS to build/publish mobile apps. This project is optimized for devices, not static hosting.
- **Not recommended:** Netlify/Vercel static hosting. Expo web can be built, but React Native-specific modules (maps, reanimated, native Firebase) are not tuned for a production web experience.

## Data sources and fallbacks

- Primary live data: NWIC `datastore_search` (public). Configurable via `.env`.
- Secondary legacy APIs: placeholders in `governmentAPI.js` (only used if enabled).
- Fallback: Mock datasets in `data/` keep the app usable offline or without credentials.

## Project structure (high level)

```
components/        Reusable UI
screens/           Auth + main feature screens
services/          Data adapters (nwicService, dataService, firebase, etc.)
data/              Mock datasets
store/             Context providers (auth/theme)
utils/             Helpers (animations, theme)
```

## Roadmap (truthful)

- [x] NWIC integration with national aggregation + graceful fallbacks
- [x] Mock-friendly dashboards and station detail views
- [ ] Harden Expo web or provide dedicated web client
- [ ] Real push notifications and offline cache/sync
- [ ] Replace mock AI predictions with a real model/service
- [ ] Expand NWIC resource coverage list and caching window

## Contributing

Pull requests are welcome. Please avoid committing secrets; use `.env` locally and keep keys out of Git history.

## License

MIT. See `LICENSE`.
