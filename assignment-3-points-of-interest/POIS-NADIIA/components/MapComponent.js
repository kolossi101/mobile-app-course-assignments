import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../styles/styles';
import { MESSAGES, MAP_CONFIG } from '../utils/constants';
import { getCurrentLocation } from '../services/locationService';
import { fetchPOIs } from '../services/geoApifyService';
import POIMarker from './POIMarker';
import POIDetails from './POIDetails';
import LoadingScreen from '../screens/LoadingScreen';

const MapComponent = () => {
  const [error, setError] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [poiList, setPoiList] = useState([]);
  const mapReference = useRef(null);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(MESSAGES.LOADING);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingMessage(MESSAGES.LOADING);

      const location = await getCurrentLocation();

      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        ...MAP_CONFIG.INITIAL_REGION,
      };
      setMapRegion(region);
      setLoadingMessage('Loading nearby places...');
      const poisData = await fetchPOIs(location.latitude, location.longitude);
      setPoiList(poisData);
      setLoading(false);
    } catch (error) {
      console.error('ERROR: Error during app initialization', error);
      setPoiList([]);
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    initializeApp();
  };

  const handleMarkerPress = (poi) => {
    setSelectedPOI(poi);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <LoadingScreen message={loadingMessage} />;
  }

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>What's Nearby?</Text>
        <Text style={styles.headerSubtitle}>
          Displaying restaurants and services near you.
        </Text>
      </View>
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
          >
            {poiList.map((poi) => (
              <POIMarker
                key={poi.id}
                poi={poi}
                onMarkerPress={handleMarkerPress}
              />
            ))}
          </MapView>
        )}

        {selectedPOI && (
          <POIDetails
            poi={selectedPOI}
            visible={modalVisible}
            onClose={handleCloseModal}
          />
        )}
      </View>
    </View>
  );
};

export default MapComponent;
