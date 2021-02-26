import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import MainNavigator from './navigation/MainNavigator';
import Theme from './containers/Theme';
import initTranslations from './locale';

initTranslations();
enableScreens();

export default function App() {
    return (
        <OverflowMenuProvider>
            <Theme>
                <MainNavigator />
            </Theme>
        </OverflowMenuProvider>
    );
}