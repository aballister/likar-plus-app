import React from 'react';
import Theme from './containers/Theme';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigation/MainNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
    return (
         <Theme>
            <MainNavigator />
         </Theme>
    );
}