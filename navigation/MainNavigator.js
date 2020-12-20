import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';

const MyStack = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
function AuthNavigator() {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name='Auth' component={LoginScreen} />
        </AuthStackNavigator.Navigator>
    )
}

export default function MainNavigator() {
    const isAuthenticated = true;

    return (
        <NavigationContainer>
            {
                isAuthenticated ?
                    <MyStack.Navigator>
                        <MyStack.Screen name='Main' component={MainScreen} />
                    </MyStack.Navigator> :
                    <AuthNavigator />
            }
        </NavigationContainer>
    )
}