import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register'
import Login from './src/screens/Login';
import HomeMenu from './src/componentes/HomeMenu';
import Home from './src/screens/Home'

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
      <Stack.Screen options={{
          headerShown: false,
          }} name="Register" component={Register} />
      <Stack.Screen options={{
          headerShown: false,
          }} name="Login" component={Login} />
      <Stack.Screen options={{
          headerShown: false,
          }} name="HomeMenu" component={HomeMenu} />
      <Stack.Screen options={{
          headerShown: false,
          }} name="Home" component={Home} />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

