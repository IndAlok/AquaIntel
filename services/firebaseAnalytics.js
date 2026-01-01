import { getAnalytics, logEvent as firebaseLogEvent, setUserId as firebaseSetUserId, setUserProperties } from 'firebase/analytics';
import app from './firebase';

let analytics;
try {
  analytics = getAnalytics(app);
  console.log('âœ… Firebase Analytics initialized');
} catch (error) {
  console.warn('âš ï¸  Firebase Analytics not available:', error.message);
}

export const logEvent = async (eventName, params = {}) => {
  if (!analytics) {
    console.warn('Analytics not initialized, skipping event:', eventName);
    return;
  }
  
  try {
    firebaseLogEvent(analytics, eventName, params);
    console.log(`ðŸ“Š Analytics: ${eventName}`, params);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

export const logScreenView = async (screenName, screenClass = null) => {
  if (!analytics) return;
  
  try {
    firebaseLogEvent(analytics, 'screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName
    });
    console.log(`ðŸ“± Screen View: ${screenName}`);
  } catch (error) {
    console.error('Screen view logging error:', error);
  }
};

export const setUserProperty = async (properties) => {
  if (!analytics) return;
  
  try {
    setUserProperties(analytics, properties);
    console.log(`ðŸ‘¤ User Properties:`, properties);
  } catch (error) {
    console.error('User property error:', error);
  }
};

export const setUserId = async (userId) => {
  if (!analytics) return;
  
  try {
    firebaseSetUserId(analytics, userId);
    console.log(`ðŸ†” User ID set: ${userId}`);
  } catch (error) {
    console.error('User ID error:', error);
  }
};

export const logError = (error, context = {}) => {
  try {
    console.error('ðŸ”¥ Error:', error, context);
    if (analytics) {
      firebaseLogEvent(analytics, 'error', {
        error_message: error.message,
        error_stack: error.stack?.substring(0, 100),
        ...context
      });
    }
  } catch (err) {
    console.error('Error logging failed:', err);
  }
};

export const setCustomAttribute = (key, value) => {
  console.log(`ðŸ ·ï¸  Custom Attribute: ${key} = ${value}`);
};

export const logBreadcrumb = (message) => {
  console.log(`ðŸ ž Breadcrumb: ${message}`);
};

export const AnalyticsEvents = {
  LOGIN: (method) => logEvent('login', { method }),
  SIGNUP: (method) => logEvent('sign_up', { method }),
  LOGOUT: () => logEvent('logout'),
  
  VIEW_DASHBOARD: () => logScreenView('Dashboard'),
  VIEW_MAP: () => logScreenView('Map'),
  VIEW_FORECAST: () => logScreenView('Forecast'),
  VIEW_STATION_DETAIL: (stationId) => logEvent('view_item', { item_id: stationId, item_name: 'station' }),
  
  FETCH_WATER_DATA: (source) => logEvent('fetch_data', { data_type: 'water', source }),
  FETCH_RAINFALL_DATA: (location) => logEvent('fetch_data', { data_type: 'rainfall', location }),
  VIEW_PREDICTION: (type) => logEvent('view_prediction', { prediction_type: type }),
  
  SEARCH_STATION: (query) => logEvent('search', { search_term: query }),
  FILTER_DATA: (filterType) => logEvent('filter_data', { filter: filterType }),
  SHARE_REPORT: (reportType) => logEvent('share', { content_type: reportType, method: 'share' }),
  
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
  AnalyticsEvents
};
