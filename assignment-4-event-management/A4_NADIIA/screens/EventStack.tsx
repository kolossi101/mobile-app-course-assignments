import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventList from './EventList';
import EventDetail from './EventDetail';

const Stack = createNativeStackNavigator();
const EventStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={EventList} name="EventList" />
      <Stack.Screen component={EventDetail} name="EventDetail" />
    </Stack.Navigator>
  );
};

export default EventStack;
