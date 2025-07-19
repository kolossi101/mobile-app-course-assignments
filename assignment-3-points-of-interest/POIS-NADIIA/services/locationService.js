import * as Location from 'expo-location';
import { Alert } from 'react-native';

const requestLocationPermission = async () => {
  try {
    const permissionObject = await Location.requestForegroundPermissionsAsync();
    if (permissionObject.status === 'granted') {
      console.log('Permission Granted!');
      return true;
    } else {
      console.log('Permission Denied!');
      return false;
    }
  } catch (error) {
    console.error('An error occurred while requesting permission:', error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  try {
    const enabled = await Location.hasServicesEnabledAsync();
    // Check if location services enabled
    if (!enabled) {
      throw new Error('ERROR: Location services are not enabled');
    }
    // Request permission if not granted
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      throw new Error('Location permission denied');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('ERROR: Could not get current location', error);
    throw new Error(error.message || 'Could not get current location');
  }
};
