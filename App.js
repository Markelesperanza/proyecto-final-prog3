import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register'
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>

     <Stack.Navigator>
        <Stack.Screen name="Register" component={ Register } />
        <Stack.Screen name="Login" component={ Login } />
     </Stack.Navigator>

   </NavigationContainer>

  );
}

