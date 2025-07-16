import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../styles/styles';
import { MESSAGES, MAP_CONFIG } from '../utils/constants';
import { getCurrentLocation } from '../services/locationService';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const mapReference = useRef(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setError(null);
      // Get current user location
      const location = await getCurrentLocation();
      if (!location) {
        throw new Error(MESSAGES.LOCATION_ERROR);
      }

      setUserLocation(location);
      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        ...MAP_CONFIG.INITIAL_REGION,
      };
      setMapRegion(region);
    } catch (error) {
      console.error('ERROR: Error during app initialization', error);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  const handleRetry = () => {
    initializeApp();
  };

  // error screen
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // app
  return (
    <View style={styles.mapContainer}>
      {mapRegion && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          ref={mapReference}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
        />
      )}
    </View>
  );
};

export default MapComponent;
