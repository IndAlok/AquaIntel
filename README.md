<div align="center">

# 🌊 AquaIntel

### Real-Time Groundwater Intelligence Platform

[![Smart India Hackathon](https://img.shields.io/badge/SIH-2025-orange)](https://sih.gov.in/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61dafb)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~50.0-000020)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**For Ministry of Jal Shakti, Government of India**

[Features](#-features) • [Installation](#-installation) • [Demo](#-demo) • [Tech Stack](#-technology-stack) • [Contributing](#-contributing)

![AquaIntel Banner](https://via.placeholder.com/1200x400/FF9933/FFFFFF?text=AquaIntel+-+Groundwater+Intelligence)

</div>

---

## 🌊 Overview

AquaIntel is a sophisticated mobile application designed for real-time evaluation, analysis, and visualization of India's groundwater resources. Built for Smart India Hackathon 2025, it provides comprehensive insights from 5,260+ Digital Water Level Recorder (DWLR) stations across India.

## ✨ Features

### 📊 Dashboard
- Real-time overview of all DWLR stations
- Active, critical, and inactive station metrics
- Monsoon status tracking
- Advanced search and filtering capabilities
- Quick station status assessment

### 🗺️ Interactive Map
- Geographic visualization of all stations
- Color-coded markers based on water level risk
- Station clustering for better performance
- Quick access to station details from map
- Filter stations by status and risk level

### 📈 Station Details
- Comprehensive water level data
- Interactive charts and gauges
- 2-year historical data visualization
- Risk assessment with AI insights
- Real-time alerts and recommendations
- Multiple time range views (30d, 90d, 1 year)

### 🔮 Predictive Analytics
- AI-powered water level forecasting
- 30-day to 6-month predictions
- Confidence intervals for predictions
- Monthly forecast summaries
- Trend analysis and risk predictions
- Machine learning-based insights

### 📝 Community Reporting
- Report station issues
- Submit app feedback
- Track community impact
- Email notifications for updates
- Category-based reporting system

### ⚙️ Settings & Profile
- User profile management
- Notification preferences
- Data sync controls
- Cache management
- App information and credits

## 🛠️ Technology Stack

- **Framework:** React Native with Expo
- **UI Library:** React Native Paper (Material Design 3)
- **Charts:** Victory Native
- **Maps:** React Native Maps
- **Navigation:** React Navigation
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **State Management:** React Context API
- **Icons:** Material Community Icons

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IndAlok/AquaIntel.git
   cd AquaIntel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config to `services/firebase.js`

4. **Run the application:**
   ```bash
   # Start the development server
   npm start

   # Run on Android
   npm run android

   # Run on iOS
   npm run ios

   # Run on Web
   npm run web
   ```

## � Building APK for Testing

**Don't know how to build an APK?** No problem! You don't need Android Studio or complex setup.

### Quick Build (3 commands)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

### OR Test Without Building
```bash
npx expo start
# Then scan QR code with Expo Go app on your phone
```

**📖 Complete Guide:** See [QUICK_BUILD.md](QUICK_BUILD.md) or [BUILD_APK_GUIDE.md](BUILD_APK_GUIDE.md) for detailed instructions.

## �🔧 Configuration

### Firebase Setup

Replace the configuration in `services/firebase.js` with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Theme Customization

Modify `constants/theme.js` to customize colors and styling:
- Primary color (Saffron from Indian flag)
- Secondary color (Blue from Ashoka Chakra)
- Success/Warning/Error colors
- Typography and spacing

## 📁 Project Structure

```
AquaIntel/
├── assets/              # Images and static assets
├── components/          # Reusable UI components
│   ├── AppHeader.jsx
│   ├── DataCard.jsx
│   ├── WaterLevelChart.jsx
│   ├── GaugeIndicator.jsx
│   └── ThemedButton.jsx
├── constants/           # Theme and configuration
│   └── theme.js
├── data/               # Mock data generators
│   ├── mockStations.js
│   ├── mockTimeSeriesData.js
│   ├── mockRainfallData.js
│   └── mockPredictions.js
├── navigation/         # Navigation configuration
│   ├── AppNavigator.jsx
│   ├── AuthNavigator.jsx
│   └── RootNavigator.jsx
├── screens/           # Application screens
│   ├── auth/         # Authentication screens
│   └── main/         # Main app screens
├── services/         # External services
│   └── firebase.js
├── store/           # State management
│   └── AuthContext.js
└── App.js          # Application entry point
```

## 🎨 Design Philosophy

- **Material Design 3:** Modern, accessible UI components
- **Indian Flag Colors:** Saffron, White, Green, and Blue (Ashoka Chakra)
- **Responsive Design:** Optimized for various screen sizes
- **Accessibility:** High contrast, readable fonts, icon labels
- **Performance:** Efficient data loading and rendering

## 📊 Mock Data

The application uses sophisticated mock data generators to simulate:
- 100+ DWLR stations across 18 Indian states
- 2 years of hourly water level data
- Seasonal variations (monsoon patterns)
- Rainfall data correlated with groundwater levels
- AI-powered predictions and risk assessments
- Real-time alerts and insights

## 🚀 Key Highlights

1. **Comprehensive Coverage:** Data from all major states and aquifer types
2. **Real-time Updates:** Live monitoring with instant notifications
3. **Predictive AI:** Machine learning forecasts for proactive management
4. **Community Driven:** Collaborative reporting and feedback system
5. **Government Ready:** Built for Ministry of Jal Shakti specifications
6. **Scalable Architecture:** Ready for production deployment

## 🔐 Authentication

Demo credentials for testing:
- Email: demo@aquaintel.gov.in
- Password: demo123456

Or create a new account using the signup flow.

## 📱 Screenshots

<div align="center">

| Dashboard | Map View | Station Details |
|-----------|----------|-----------------|
| ![Dashboard](https://via.placeholder.com/250x500/FF9933/FFFFFF?text=Dashboard) | ![Map](https://via.placeholder.com/250x500/138808/FFFFFF?text=Map+View) | ![Details](https://via.placeholder.com/250x500/000080/FFFFFF?text=Station+Details) |

| Forecast | Reports | Settings |
|----------|---------|----------|
| ![Forecast](https://via.placeholder.com/250x500/9C27B0/FFFFFF?text=Forecast) | ![Reports](https://via.placeholder.com/250x500/FF9800/FFFFFF?text=Reports) | ![Settings](https://via.placeholder.com/250x500/2196F3/FFFFFF?text=Settings) |

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/IndAlok/AquaIntel.git
cd AquaIntel

# Install dependencies
npm install

# Start the development server
npm start

# Build APK locally (ARM64-v8a only)
npm run build:local

# Build with EAS (ARM64-v8a only, when available)
npm run build:android
```

**Note:** All builds are hardcoded for **ARM64-v8a architecture only** for optimal size and performance.

**👉 For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

## 🎯 Roadmap

- [x] Core dashboard and data visualization
- [x] Interactive maps with station markers
- [x] AI-powered predictive analytics
- [x] Community reporting system
- [ ] Real-time notifications
- [ ] Offline mode support
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Integration with live DWLR API
- [ ] Advanced ML models for predictions
- [ ] Export and sharing features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please create an issue using our templates:
- [🐛 Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml)
- [✨ Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Additional Terms:** This software is developed for the Ministry of Jal Shakti, Government of India, as part of Smart India Hackathon 2025.

## 👥 Team

Developed for **Smart India Hackathon 2025**

### Core Technologies
- React Native & Expo
- React Native Paper (Material Design 3)
- Firebase (Auth & Firestore)
- Victory Native (Charts)
- React Navigation

## 📞 Support & Contact

- 📧 Email: support@aquaintel.gov.in
- 🌐 Website: https://aquaintel.gov.in
- 💬 Issues: [GitHub Issues](https://github.com/IndAlok/AquaIntel/issues)

## 🙏 Acknowledgments

- **Ministry of Jal Shakti**, Government of India
- **Smart India Hackathon 2025** organizers
- **Central Ground Water Board (CGWB)** for domain knowledge
- All **DWLR station operators** across India
- Open source community for amazing tools

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/IndAlok/AquaIntel?style=social)
![GitHub forks](https://img.shields.io/github/forks/IndAlok/AquaIntel?style=social)
![GitHub issues](https://img.shields.io/github/issues/IndAlok/AquaIntel)
![GitHub pull requests](https://img.shields.io/github/issues-pr/IndAlok/AquaIntel)
![GitHub last commit](https://img.shields.io/github/last-commit/IndAlok/AquaIntel)
![GitHub repo size](https://img.shields.io/github/repo-size/IndAlok/AquaIntel)

---

<div align="center">

### 🌊 Made with ❤️ for India's Water Future 💧

**"जल ही जीवन है" - Water is Life**

[![Ministry of Jal Shakti](https://img.shields.io/badge/Ministry%20of-Jal%20Shakti-orange)](https://jalshakti.gov.in/)
[![Government of India](https://img.shields.io/badge/Government%20of-India-138808)](https://india.gov.in/)

</div>
