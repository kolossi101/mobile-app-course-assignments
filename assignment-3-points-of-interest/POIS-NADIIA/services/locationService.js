import * as Location from 'expo-location';

const requestLocationPermission = async () => {
  try {
    const permissionObject = await Location.requestForegroundPermissionsAsync();

    if (permissionObject.status === 'granted') {
      console.log('Permission Granted!');
      //Alert.alert("Success", "Permission Granted!");
    } else {
      throw new Error('ERROR: Location permission not granted');
      //console.log('Permission Denied!');
      //Alert.alert("Failure", "Permission Denied!");
    }
  } catch (error) {
    throw new Error(
      'ERROR: An error occurred while requesting permission:',
      error
    );
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
    await requestLocationPermission();

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeout: 15000, // timeout is 15 seconds
      maximumAge: 10000, // accepting up to 10 seconds old cached location
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('ERROR: Could not get current location', error);
    return null;
  }
};
