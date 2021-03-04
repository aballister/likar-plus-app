import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CustomerScreen from '../screens/customers/CustomerScreen';
import CustomersScreen from '../screens/customers/CustomersScreen';
import CustomerCreateScreen from '../screens/customers/CustomerCreateScreen';
import CustomerEditScreen from '../screens/customers/CustomerEditScreen';
import theme from '../theme/theme';

const CustomersStackNavigator = createStackNavigator();

export default function CustomersNavigator() {
    return (
        <CustomersStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerTintColor: theme.colors.white,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
            }}
        >
            <CustomersStackNavigator.Screen
                component={CustomersScreen}
                name='Customers'
                options={{
                    title: 'Клієнти',
                }}
            />
            <CustomersStackNavigator.Screen
                component={CustomerScreen}
                name='Customer'
                options={{
                    title: 'Клієнт',
                }}
            />
            <CustomersStackNavigator.Screen
                component={CustomerCreateScreen}
                name='CustomerCreate'
                options={{
                    title: 'Новий клієнт',
                }}
            />
            <CustomersStackNavigator.Screen
                component={CustomerEditScreen}
                name='CustomerEdit'
                options={{
                    title: 'Редагування клієнта',
                }}
            />
        </CustomersStackNavigator.Navigator>
    );
}