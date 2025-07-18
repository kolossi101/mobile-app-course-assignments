import { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { styles } from '../styles/styles';
import { MAP_CONFIG } from '../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const POIMarker = ({ poi, onMarkerPress }) => {
  const getMarkerStyle = () => {
    switch (poi.category) {
      case MAP_CONFIG.CATEGORY_DISPLAY.RESTAURANT:
        return styles.restaurantMarker;
      case MAP_CONFIG.CATEGORY_DISPLAY.SERVICE:
        return styles.serviceMarker;
      default:
        return styles.restaurantMarker;
    }
  };

  const getMarkerIcon = () => {
    switch (poi.category) {
      case MAP_CONFIG.CATEGORY_DISPLAY.RESTAURANT:
        return <Icon name="silverware-fork-knife" size={25} color="white" />;
      case MAP_CONFIG.CATEGORY_DISPLAY.SERVICE:
        return <Icon name="cog" size={25} color="white" />;
      default:
        return <Icon name="map-marker" size={25} color="#ff5e5e" />;
    }
  };

  const handleMarkerPress = () => {
    if (onMarkerPress) {
      onMarkerPress(poi);
    }
  };

  return (
    <Marker
      key={poi.id}
      coordinate={poi.coordinates}
      onPress={handleMarkerPress}
    >
      <View style={styles.markerContainer}>
        <View style={getMarkerStyle()}>{getMarkerIcon()}</View>
      </View>
    </Marker>
  );
};

export default POIMarker;
