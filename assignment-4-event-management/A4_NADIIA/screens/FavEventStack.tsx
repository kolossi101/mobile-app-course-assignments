import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavEventList from './FavEventList';
import EventDetail from './EventDetail';

const Stack = createNativeStackNavigator();
const FavEventStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={FavEventList} name="FavEventList" />
      <Stack.Screen component={EventDetail} name="EventDetail" />
    </Stack.Navigator>
  );
};

export default FavEventStack;
