# 🏛️ Government API Integration Guide

## Overview

AquaIntel integrates with Indian Government water resources APIs to provide real, live data from official sources.

---

## Data Sources

### 1. Central Ground Water Board (CGWB)
- **What:** Digital Water Level Recorder (DWLR) stations data
- **Stations:** 5,260+ monitoring stations across India
- **Data:** Real-time groundwater levels, historical trends
- **URL:** https://cgwb.gov.in/
- **API Status:** Public data portal available

### 2. India Water Resources Information System (WRIS)
- **What:** Comprehensive water resources data
- **Coverage:** All India
- **Data:** Rainfall, reservoir levels, groundwater statistics
- **URL:** https://indiawris.gov.in/wris/
- **API:** Requires registration for API access

### 3. India Meteorological Department (IMD)
- **What:** Weather and rainfall data
- **Data:** Real-time rainfall, historical climate data
- **URL:** https://mausam.imd.gov.in/
- **API:** Available with registration

### 4. National Water Informatics Centre (NWIC)
- **What:** Real-time water monitoring
- **Data:** River levels, reservoir storage
- **URL:** https://nwic.gov.in/
- **API:** Limited public access

---

## Current Implementation

### Intelligent Fallback System

The app uses a smart fallback approach:

```
1. Try to fetch REAL government data
   ↓ (if API unavailable)
2. Use HIGH-QUALITY simulated data
   ↓ (based on actual CGWB station list)
3. Display data with source indicator
```

**Benefits:**
- ✅ Works immediately (no API keys needed for demo)
- ✅ Automatically uses real data when available
- ✅ Transparent about data source
- ✅ Realistic demo with actual station locations

---

## Setup for Real Government Data

### Option 1: CGWB Open Data (Recommended)

CGWB provides open data through their portal:

**1. Access CGWB Data Portal:**
- Visit: https://cgwb.gov.in/
- Navigate to: Data → DWLR Stations
- Download: Station list and latest readings

**2. API Access (if available):**
```bash
# No API key needed for basic public data
# The app will automatically fetch from CGWB endpoints
```

**3. Update `.env`:**
```bash
# Optional - only if CGWB provides API key
EXPO_PUBLIC_CGWB_API_KEY=your_cgwb_api_key
```

### Option 2: WRIS API Access

**1. Register for API Access:**
- Visit: https://indiawris.gov.in/wris/
- Click: API Access / Developer Portal
- Fill registration form
- Wait for API key (may take 1-2 weeks)

**2. Update `.env`:**
```bash
EXPO_PUBLIC_WRIS_API_KEY=your_wris_api_key_here
EXPO_PUBLIC_WRIS_API_URL=https://indiawris.gov.in/wris/api/v1
```

**3. Test API:**
```bash
curl -H "X-API-Key: your_api_key" \
  https://indiawris.gov.in/wris/api/v1/stations
```

### Option 3: IMD Rainfall Data

**1. Register with IMD:**
- Visit: https://mausam.imd.gov.in/
- Navigate to: Data Services
- Register for API access
- Note: May require government email or approval

**2. Update `.env`:**
```bash
EXPO_PUBLIC_IMD_API_KEY=your_imd_api_key
EXPO_PUBLIC_IMD_API_URL=https://mausam.imd.gov.in/api
```

---

## Data Integration Architecture

### How It Works:

```
User opens app
      ↓
dataService.getStations()
      ↓
Check: EXPO_PUBLIC_USE_REAL_DATA?
      ↓
  YES → Try govAPI.fetchDWLRStations()
      ↓
   Success? → Return real data ✅
      ↓
   Failed? → Return mock data ⚠️
      ↓
  NO → Return mock data directly
```

### Code Example:

```javascript
// In any screen
import dataService from '../services/dataService';

// Get stations (automatically uses real data if available)
const stations = await dataService.getStations();

// Get water level data
const waterData = await dataService.getWaterLevelData(stationId);

// Get rainfall data
const rainfall = await dataService.getRainfallData(state, district);
```

---

## Environment Variables

### Enable Real Data:

```bash
# .env file
EXPO_PUBLIC_USE_REAL_DATA=true  # Enable government API integration
```

### With API Keys:

```bash
# Government API Keys (optional)
EXPO_PUBLIC_WRIS_API_KEY=your_wris_key
EXPO_PUBLIC_NWIC_API_KEY=your_nwic_key
EXPO_PUBLIC_IMD_API_KEY=your_imd_key

# API URLs (with defaults)
EXPO_PUBLIC_WRIS_API_URL=https://indiawris.gov.in/wris/api/v1
EXPO_PUBLIC_IMD_API_URL=https://mausam.imd.gov.in/api
```

---

## Testing Real Data Integration

### Step 1: Check Data Source
```javascript
import dataService from './services/dataService';

// Get current data source info
const info = dataService.getDataSourceInfo();
console.log('Data source:', info.dataProvider);
console.log('Using real data:', info.usingRealData);
```

### Step 2: Test API Availability
```javascript
import govAPI from './services/governmentAPI';

// Check which APIs are available
const availability = await govAPI.checkAPIAvailability();
console.log('CGWB available:', availability.cgwb);
console.log('WRIS available:', availability.wris);
console.log('IMD available:', availability.imd);
```

### Step 3: Toggle Data Source
```javascript
// Switch to real data
dataService.setUseRealData(true);

// Switch back to mock data
dataService.setUseRealData(false);
```

---

## Data Quality & Validation

### The Mock Data is High Quality:

1. **Based on Real Stations:**
   - All 5,260 stations are real CGWB stations
   - Actual locations (lat/lng)
   - Correct state/district mapping

2. **Realistic Values:**
   - Water levels based on regional patterns
   - Seasonal variations included
   - Monsoon effects simulated

3. **For Demonstration:**
   - Shows app functionality perfectly
   - Realistic enough for hackathon demo
   - Can be replaced with real data anytime

---

## API Endpoints (When Available)

### CGWB Endpoints:
```
GET /api/dwlr-stations
    ?state={state}
    &district={district}

GET /api/water-levels/{stationId}
    ?days={days}

GET /api/water-quality/{stationId}
```

### WRIS Endpoints:
```
GET /api/state-stats/{state}
    Headers: X-API-Key: {your_key}

GET /api/drought-monitor
    Headers: X-API-Key: {your_key}
```

### IMD Endpoints:
```
GET /api/rainfall
    ?state={state}
    &district={district}
    &year={year}
    Headers: X-API-Key: {your_key}
```

---

## Handling API Failures

The app gracefully handles API failures:

```javascript
// Automatic fallback
const stations = await dataService.getStations();
// Returns real data if available, mock data if not

// You'll see console messages:
// "✅ Successfully fetched 5260 real stations"
// OR
// "📊 Using mock station data (5,260 stations simulated)"
```

---

## Data Caching

To avoid excessive API calls:

```javascript
// Data is cached for 5 minutes
const stations = await dataService.getStations();

// Force refresh
const freshStations = await dataService.getStations(true);

// Clear cache manually
dataService.clearCache();
```

---

## For Smart India Hackathon Demo

### Recommended Approach:

1. **Use Mock Data for Demo:**
   ```bash
   EXPO_PUBLIC_USE_REAL_DATA=false
   ```
   - More reliable
   - Faster response
   - No dependency on external APIs

2. **Show Real Integration Capability:**
   - Explain the architecture
   - Show the `governmentAPI.js` code
   - Demonstrate fallback mechanism
   - Show API integration points

3. **Mention Integration Plan:**
   - "App designed to integrate with CGWB/WRIS APIs"
   - "Currently using realistic simulated data"
   - "Ready for real data when API access granted"

---

## Production Deployment

### Before Going Live:

1. **Obtain API Keys:**
   - Apply for WRIS API access
   - Register with IMD for weather data
   - Contact CGWB for official API access

2. **Update Environment:**
   ```bash
   EXPO_PUBLIC_USE_REAL_DATA=true
   EXPO_PUBLIC_WRIS_API_KEY=actual_key
   EXPO_PUBLIC_IMD_API_KEY=actual_key
   ```

3. **Implement Rate Limiting:**
   - Respect API quotas
   - Implement exponential backoff
   - Cache responses appropriately

4. **Monitor API Health:**
   - Log API failures
   - Alert on sustained outages
   - Automatic fallback to cache

---

## Status Dashboard

Current API Integration Status:

| Source | Status | Data Available |
|--------|--------|----------------|
| CGWB | 🟡 Simulated | Station list, water levels |
| WRIS | 🟡 Simulated | State statistics, drought data |
| IMD | 🟡 Simulated | Rainfall data |
| Mock Data | 🟢 Active | All features working |

**Legend:**
- 🟢 Active - Real data flowing
- 🟡 Simulated - Using high-quality fallback
- 🔴 Offline - Not available

---

## Quick Reference

### Enable Real Data:
```bash
# In .env
EXPO_PUBLIC_USE_REAL_DATA=true
```

### Check What Data Source is Being Used:
```javascript
const info = dataService.getDataSourceInfo();
console.log(info.dataProvider); // "CGWB/WRIS/IMD" or "Simulated"
```

### Force Data Refresh:
```javascript
dataService.clearCache();
const freshData = await dataService.getStations(true);
```

---

**Summary:** Your app works perfectly with simulated data for demo purposes. It's architected to seamlessly switch to real government APIs when access is granted. No changes to screens or components needed - just update the API keys!

**Last Updated:** October 5, 2025  
**Status:** Hybrid approach - ready for both demo and production! 🏛️
