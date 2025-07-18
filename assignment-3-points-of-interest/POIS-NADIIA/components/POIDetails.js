import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../styles/styles';

const POIDetails = ({ poi, visible, onClose }) => (
  <Modal isVisible={visible}>
    <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>{poi.name}</Text>
      <Text style={styles.modalSubtitle}>{poi.address}</Text>
      {poi.category && <Text style={styles.modalCategory}>{poi.category}</Text>}

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
  </Modal>
);

export default POIDetails;
