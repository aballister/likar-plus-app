import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import {
    Button, SafeAreaView, View,
} from 'react-native';
import theme from '../theme/theme';
import OrdersNavigator from './OrdersNavigator';
import DoctorsNavigator from './DoctorsNavigator';
import Icon from '../components/Icon';
import DriversNavigator from './DriversNavigator';
import CompaniesNavigator from './CompaniesNavigator';
import CustomersNavigator from './CustomersNavigator';

const AppDrawerNavigator = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <AppDrawerNavigator.Navigator
            drawerContent={props => (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} />
                        <Button
                            color={theme.colors.primary}
                            onPress={() => console.log('LOGOUT')}
                            title='Вихід'
                        />
                    </SafeAreaView>
                </View>
            )}
            drawerContentOptions={{
                activeTintColor: theme.colors.primary,
            }}
            drawerStyle={{ width: 280 }}
        >
            <AppDrawerNavigator.Screen
                component={OrdersNavigator}
                name='Orders'
                options={{
                    title: 'Замовлення',
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='format-list-bulleted'
                            size={23}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={CustomersNavigator}
                name='Customers'
                options={{
                    title: 'Клієнти',
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='people'
                            size={23}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={DoctorsNavigator}
                name='Doctors'
                options={{
                    title: 'Лікарі',
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='medical-services'
                            size={23}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={DriversNavigator}
                name='Drivers'
                options={{
                    title: 'Водії',
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='directions-car'
                            size={23}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={CompaniesNavigator}
                name='Companies'
                options={{
                    title: 'Страхові компанії',
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='business-center'
                            size={23}
                        />
                    ),
                }}
            />
        </AppDrawerNavigator.Navigator>
    );
}