// services/firebaseAnalytics.js
// Firebase Analytics and Crashlytics integration

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

// Analytics service
export const logEvent = async (eventName, params = {}) => {
  try {
    await analytics().logEvent(eventName, params);
    console.log(`📊 Analytics: ${eventName}`, params);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Log screen view
export const logScreenView = async (screenName, screenClass = null) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName
    });
    console.log(`📱 Screen View: ${screenName}`);
  } catch (error) {
    console.error('Screen view logging error:', error);
  }
};

// Set user properties
export const setUserProperty = async (name, value) => {
  try {
    await analytics().setUserProperty(name, value);
    console.log(`👤 User Property: ${name} = ${value}`);
  } catch (error) {
    console.error('User property error:', error);
  }
};

// Set user ID
export const setUserId = async (userId) => {
  try {
    await analytics().setUserId(userId);
    await crashlytics().setUserId(userId);
    console.log(`🆔 User ID set: ${userId}`);
  } catch (error) {
    console.error('User ID error:', error);
  }
};

// Crashlytics service
export const logError = (error, context = {}) => {
  try {
    crashlytics().recordError(error);
    crashlytics().log(`Error in ${context.screen || 'unknown'}: ${error.message}`);
    console.error('🔥 Crashlytics: Error logged', error);
  } catch (err) {
    console.error('Crashlytics logging error:', err);
  }
};

// Log custom attributes for crash reports
export const setCustomAttribute = (key, value) => {
  try {
    crashlytics().setAttribute(key, value);
    console.log(`🏷️ Crashlytics Attribute: ${key} = ${value}`);
  } catch (error) {
    console.error('Crashlytics attribute error:', error);
  }
};

// Log breadcrumb
export const logBreadcrumb = (message) => {
  try {
    crashlytics().log(message);
    console.log(`🍞 Breadcrumb: ${message}`);
  } catch (error) {
    console.error('Breadcrumb error:', error);
  }
};

// Crash reporting enabled/disabled
export const setCrashlyticsEnabled = async (enabled) => {
  try {
    await crashlytics().setCrashlyticsCollectionEnabled(enabled);
    console.log(`🔥 Crashlytics ${enabled ? 'enabled' : 'disabled'}`);
  } catch (error) {
    console.error('Crashlytics toggle error:', error);
  }
};

// Test crash (for testing only!)
export const testCrash = () => {
  crashlytics().crash();
};

// Pre-defined event loggers
export const AnalyticsEvents = {
  // Authentication events
  LOGIN: (method) => logEvent('login', { method }),
  SIGNUP: (method) => logEvent('sign_up', { method }),
  LOGOUT: () => logEvent('logout'),
  
  // Screen events
  VIEW_DASHBOARD: () => logScreenView('Dashboard'),
  VIEW_MAP: () => logScreenView('Map'),
  VIEW_FORECAST: () => logScreenView('Forecast'),
  VIEW_STATION_DETAIL: (stationId) => logEvent('view_station', { station_id: stationId }),
  
  // Data events
  FETCH_WATER_DATA: (source) => logEvent('fetch_water_data', { source }),
  FETCH_RAINFALL_DATA: (location) => logEvent('fetch_rainfall_data', { location }),
  VIEW_PREDICTION: (type) => logEvent('view_prediction', { prediction_type: type }),
  
  // User interaction
  SEARCH_STATION: (query) => logEvent('search', { search_term: query }),
  FILTER_DATA: (filterType) => logEvent('filter_data', { filter: filterType }),
  SHARE_REPORT: (reportType) => logEvent('share', { content_type: reportType }),
  
  // Settings
  CHANGE_THEME: (theme) => logEvent('change_theme', { theme }),
  TOGGLE_NOTIFICATIONS: (enabled) => logEvent('toggle_notifications', { enabled })
};

export default {
  logEvent,
  logScreenView,
  setUserProperty,
  setUserId,
  logError,
  setCustomAttribute,
  logBreadcrumb,
  setCrashlyticsEnabled,
  testCrash,
  AnalyticsEvents
};
