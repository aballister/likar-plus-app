import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CompanyScreen from '../screens/companies/CompanyScreen';
import CompaniesScreen from '../screens/companies/CompaniesScreen';
import CompanyCreateScreen from '../screens/companies/CompanyCreateScreen';
import CompanyEditScreen from '../screens/companies/CompanyEditScreen';
import theme from '../theme/theme';

const CompaniesStackNavigator = createStackNavigator();

export default function CompaniesNavigator() {
    return (
        <CompaniesStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerTintColor: theme.colors.white,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
            }}
        >
            <CompaniesStackNavigator.Screen
                component={CompaniesScreen}
                name='Companies'
                options={{
                    title: 'Страхові компанії',
                }}
            />
            <CompaniesStackNavigator.Screen
                component={CompanyScreen}
                name='Company'
                options={{
                    title: 'Страхова компанія',
                }}
            />
            <CompaniesStackNavigator.Screen
                component={CompanyCreateScreen}
                name='CompanyCreate'
                options={{
                    title: 'Нова страхова компанія',
                }}
            />
            <CompaniesStackNavigator.Screen
                component={CompanyEditScreen}
                name='CompanyEdit'
                options={{
                    title: 'Редагування страхової компанії',
                }}
            />
        </CompaniesStackNavigator.Navigator>
    );
}