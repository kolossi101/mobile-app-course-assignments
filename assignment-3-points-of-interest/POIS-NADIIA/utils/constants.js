import Constants from 'expo-constants';

// Application messages
export const MESSAGES = {
  LOCATION_ERROR: 'Error getting your location. Please check permissions.',
};

export const MAP_CONFIG = {
  INITIAL_REGION: {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  MARKER_COLORS: {
    RESTAURANT: '#FF6B6B', // Red for restaurants
    SERVICE: '#4ECDC4', // Teal for sights
  },
  CATEGORY_DISPLAY: {
    RESTAURANT: 'Restaurant',
    SERVICE: 'Service',
  },
};

export const API_CONFIG = {
  BASE_URL: Constants.expoConfig.extra.BASE_URL,
  API_KEY: Constants.expoConfig.extra.API_KEY,
  CATEGORIES: {
    RESTAURANTS: 'catering.restaurant',
    SERVICES: 'service',
  },
  // Search parameters
  SEARCH_RADIUS: 5000, // 5km radius
  MAX_RESULTS: 25,
  CONDITIONS: 'named',
};
