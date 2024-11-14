import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home';
import Post from '../screens/Post';
import Usuarios from '../screens/Usuarios';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Nuevo posteo"
                component={Post}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Lista de Usuarios"
                component={Usuarios}
                options={
                    {tabBarIcon: () => (
                <FontAwesome name="user" size={24} color="grey" />
            ),
          }}
          />
        </Tab.Navigator>
    );
};

export default HomeMenu;
