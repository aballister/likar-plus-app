import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

const AuthStackNavigator = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                component={LoginScreen}
                name='Auth'
            />
        </AuthStackNavigator.Navigator>
    );
}

export default function MainNavigator() {
    const isAuthenticated = true;

    return (
        <NavigationContainer>
            {
                isAuthenticated ?
                    <DrawerNavigator /> :
                    <AuthNavigator />
            }
        </NavigationContainer>
    );
}