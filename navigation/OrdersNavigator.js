import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderScreen from '../screens/orders/OrderScreen';
import OrderCreateScreen from '../screens/orders/OrderCreateScreen';
import OrderEditScreen from '../screens/orders/OrderEditScreen';
import theme from '../theme/theme';

const OrdersStackNavigator = createStackNavigator();

export default function OrdersNavigator() {
    return (
        <OrdersStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerTintColor: theme.colors.white,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
            }}
        >
            <OrdersStackNavigator.Screen
                component={OrdersScreen}
                name='Orders'
                options={{
                    title: 'Замовлення',
                }}
            />
            <OrdersStackNavigator.Screen
                component={OrderScreen}
                name='Order'
                options={{
                    title: 'Замовлення',
                }}
            />
            <OrdersStackNavigator.Screen
                component={OrderCreateScreen}
                name='OrderCreate'
                options={{
                    title: 'Нове замовлення',
                }}
            />
            <OrdersStackNavigator.Screen
                component={OrderEditScreen}
                name='OrderEdit'
                options={{
                    title: 'Редагування замовлення',
                }}
            />
        </OrdersStackNavigator.Navigator>
    );
}