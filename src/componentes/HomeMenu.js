import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Post from '../screens/Post';
import Usuarios from '../screens/Usuarios'
import Profile from '../screens/Profile';

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
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="home" size={24} color="grey" />

                    ),
                }}
            />
            <Tab.Screen
                name="Nuevo posteo"
                component={Post}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="post-add" size={24} color="grey" />

                    ),
                }}
            />
            <Tab.Screen
                name="Lista de Usuarios"
                component={Usuarios}
                options={
                    {
                        tabBarIcon: () => (
                            <FontAwesome name="user" size={24} color="grey" />

                        ),
                    }}
            />
            <Tab.Screen
                name="Mi Perfil"
                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="face-man-profile" size={24} color="grey" />

                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeMenu;
