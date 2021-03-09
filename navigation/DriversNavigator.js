import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import DriversScreen from '../screens/drivers/DriversScreen';
import DriverScreen from '../screens/drivers/DriverScreen';
import DriverFormScreen from '../screens/drivers/DriverFormScreen';
import theme from '../theme/theme';
import { translate } from '../locale';
import { SettingsContext } from '../context';
import settings from '../components/drivers/settings';

const DriversStackNavigator = createStackNavigator();

export default function DriversNavigator() {
    return (
        <SettingsContext.Provider value={settings}>
            <DriversStackNavigator.Navigator
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureEnabled: true,
                    headerTintColor: theme.colors.white,
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                }}
            >
                <DriversStackNavigator.Screen
                    component={DriversScreen}
                    name={settings.list.screen}
                    options={{
                        title: translate(settings.list.title),
                    }}
                />
                <DriversStackNavigator.Screen
                    component={DriverScreen}
                    name={settings.page.screen}
                    options={{
                        title: translate(settings.page.title),
                    }}
                />
                <DriversStackNavigator.Screen
                    component={DriverFormScreen}
                    name={settings.create.screen}
                    options={{
                        title: translate(settings.create.title),
                    }}
                />
                <DriversStackNavigator.Screen
                    component={DriverFormScreen}
                    name={settings.edit.screen}
                    options={{
                        title: translate(settings.edit.title),
                    }}
                />
            </DriversStackNavigator.Navigator>
        </SettingsContext.Provider>
    );
}