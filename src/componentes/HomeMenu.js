import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Post from '../screens/Post';

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
        </Tab.Navigator>
    );
};

export default HomeMenu;
