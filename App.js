import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider} from 'tailwindcss-react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import UserScreen from './screens/UserScreen';
import CategoryScreen from './screens/CategoryScreen';
import FeedbackScreen from './screens/FeedbackScreen';
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='User' component={UserScreen}
            options ={{presentation: 'modal', headerShown: false}}/>
            <Stack.Screen name='Category' component = {CategoryScreen}/>
            <Stack.Screen name='Restaurant' component={RestaurantScreen}/>
            <Stack.Screen name='Feedback' component = {FeedbackScreen}
            options = {{presentation: 'modal', headerShown: false}}/>
            <Stack.Screen name='Basket' component = {BasketScreen}/>
            <Stack.Screen name='PreparingOrderScreen' component={PreparingOrderScreen}
            options = {{presentation: 'transparentModal', headerShown: false}}
            />
            <Stack.Screen name='DeliveryScreen' component = {DeliveryScreen}
            options ={{presentation: 'modal', headerShown: false}}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
