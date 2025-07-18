import { SafeAreaView, Platform, StatusBar } from 'react-native';
import MapComponent from './components/MapComponent';
import { styles } from './styles/styles';

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={Platform.OS === 'android'}
      />
      <MapComponent />
    </SafeAreaView>
  );
}
