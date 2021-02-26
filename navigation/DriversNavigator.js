import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import DriversScreen from '../screens/drivers/DriversScreen';
import DriverScreen from '../screens/drivers/DriverScreen';
import DriverCreateScreen from '../screens/drivers/DriverCreateScreen';
import DriverEditScreen from '../screens/drivers/DriverEditScreen';
import theme from '../theme/theme';

const DriversStackNavigator = createStackNavigator();

export default function DriversNavigator() {
    return (
        <DriversStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerTintColor: theme.colors.white,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
            }}
        >
            <DriversStackNavigator.Screen
                component={DriversScreen}
                name='Drivers'
                options={{
                    title: 'Водії',
                }}
            />
            <DriversStackNavigator.Screen
                component={DriverScreen}
                name='Driver'
                options={{
                    title: 'Водій',
                }}
            />
            <DriversStackNavigator.Screen
                component={DriverCreateScreen}
                name='DriverCreate'
                options={{
                    title: 'Новий водій',
                }}
            />
            <DriversStackNavigator.Screen
                component={DriverEditScreen}
                name='DriverEdit'
                options={{
                    title: 'Редагування водія',
                }}
            />
        </DriversStackNavigator.Navigator>
    );
}