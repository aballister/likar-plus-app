import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Text, View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { format } from 'date-fns';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import drfProvider from '../../providers/restProvider';
import { CustomerItemView } from './Customers.style';
import { translate } from '../../locale';

export default function CustomerScreen({ route, navigation }) {
    const { customer } = route.params;

    function removeCustomerHandler() {
        drfProvider('DELETE', `customers/${customer.id}`)
            .then(() => {
                navigation.navigate('Customer');
            })
            .catch((error) => {
                Alert.alert(
                    'Some shit happened',
                    `${JSON.stringify(error)}`,
                    [
                        {
                            text: 'OK',
                        },
                    ],
                );
            });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='edit'
                        onPress={() => navigation.navigate('CustomerEdit', {
                            customer,
                        })}
                        title='Edit'
                    />
                    <Item
                        iconName='delete'
                        onPress={() => Alert.alert(
                            'Видалити клієнта?',
                            'Підтвердіть видалення клієнта',
                            [
                                {
                                    text: 'Відміна',
                                    style: 'cancel',
                                },
                                { text: 'Видалити', onPress: removeCustomerHandler },
                            ],
                            { cancelable: false },
                        )}
                        title='Delete'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <CustomerItemView>
                <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10 }}>
                        {customer.customer}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {customer.insurance}
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    {`${customer.lastName} ${customer.firstName} ${customer.middleName}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Дата народження:
                        </Text>
                    </View>
                    <Text>
                        {format(new Date(customer.birthday), 'dd.MM.yyyy')}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {customer.phone}
                    </Text>
                </View>
                {
                    customer.phone2 &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Додатковий телефон:
                            </Text>
                        </View>
                        <Text>
                            {customer.phone2}
                        </Text>
                    </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Адреса:
                        </Text>
                    </View>
                    <Text style={{ flex: 1 }}>
                        {`${customer.city}, ${translate(customer.streetType)}. ${customer.street}, буд. ${customer.house}, під’їзд ${customer.entrance}, поверх ${customer.floor}, кв. ${customer.flat}`}
                    </Text>
                </View>
                {
                    customer.franchise &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Франшиза:
                            </Text>
                        </View>
                        <Text>
                            {customer.franchiseValue}
                        </Text>
                    </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Коментар:
                        </Text>
                    </View>
                    <Text>
                        {customer.comment}
                    </Text>
                </View>
            </CustomerItemView>
        </View>
    );
}

CustomerScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};