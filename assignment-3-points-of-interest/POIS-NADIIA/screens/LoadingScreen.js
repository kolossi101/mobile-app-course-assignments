import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

export default LoadingScreen;
