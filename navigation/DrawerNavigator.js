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
import { translate } from '../locale';

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
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={DriversNavigator}
                name='Drivers'
                options={{
                    title: translate('drivers.drivers'),
                    // eslint-disable-next-line react/prop-types
                    drawerIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name='directions-car'
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
                        />
                    ),
                }}
            />
        </AppDrawerNavigator.Navigator>
    );
}