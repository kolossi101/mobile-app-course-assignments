import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventStack from './screens/EventStack';
import FavEventStack from './screens/FavEventStack';
import { FontAwesome } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_400Regular_Italic,
} from '@expo-google-fonts/nunito';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular_Italic,
  });
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: '#0B1D51', borderWidth: 1 },
            headerTintColor: 'black',
            headerTitleStyle: {
              padding: 5,
              fontFamily: 'Nunito_700Bold',
              color: '#f0f4ff',
            },
            headerShown: true,
            tabBarActiveTintColor: '#011638',
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Nunito_500Medium',
            },
            tabBarStyle: {
              backgroundColor: '#f0f4ff',
            },
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'Favourites') {
                iconName = 'heart';
              } else {
                iconName = 'list';
              }

              return <FontAwesome name={iconName} size={24} color={color} />;
            },
          })}
        >
          <Tab.Screen component={EventStack} name="All Events" />
          <Tab.Screen component={FavEventStack} name="Favourites" />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
npm install firebase
npm install dotenv

for navigation container
npm install @react-navigation/native

for Stack
npm install @react-navigation/native-stack

for navigator and screen
npx expo install react-native-screens react-native-safe-area-context

for Tab
npm install @react-navigation/bottom-tabs

for Icon
npm install --save react-native-vector-icons
npm install @expo/vector-icons

npm i @expo-google-fonts/nunito
*/
