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
import { OrderItemView } from './Orders.style';
import { translate } from '../../locale';

export default function OrderScreen({ route, navigation }) {
    const { order } = route.params;

    function removeOrderHandler() {
        drfProvider('DELETE', `orders/${order.id}`)
            .then(() => {
                navigation.navigate('Orders');
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
                        onPress={() => navigation.navigate('OrderEdit', {
                            order,
                        })}
                        title='Edit'
                    />
                    <Item
                        iconName='delete'
                        onPress={() => Alert.alert(
                            'Видалити замовлення?',
                            'Підтвердіть видалення замовлення',
                            [
                                {
                                    text: 'Відміна',
                                    style: 'cancel',
                                },
                                { text: 'Видалити', onPress: removeOrderHandler },
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
            <OrderItemView>
                <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10 }}>
                        {`Статус: ${order.orderStatus}`}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {format(new Date(order.orderDate), 'dd.MM.yyyy')}
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    {`${order.lastName} ${order.firstName} ${order.middleName}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Дата народження:
                        </Text>
                    </View>
                    <Text>
                        {format(new Date(order.birthday), 'dd.MM.yyyy')}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {order.phone}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Адреса:
                        </Text>
                    </View>
                    <Text style={{ flex: 1 }}>
                        {`${order.city}, ${translate(order.streetType)}. ${order.street}, буд. ${order.house}, під’їзд ${order.entrance}, поверх ${order.floor}, кв. ${order.flat}`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Замовник:
                        </Text>
                    </View>
                    <Text>
                        {order.customer}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Гарант:
                        </Text>
                    </View>
                    <Text>
                        {order.guarantor}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Поліс:
                        </Text>
                    </View>
                    <Text>
                        {order.insurance}
                    </Text>
                </View>
                {
                    order.franchise &&
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Франшиза:
                            </Text>
                        </View>
                        <Text>
                            {order.franchiseValue}
                        </Text>
                    </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Лікар:
                        </Text>
                    </View>
                    <Text>
                        {order.doctor}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Бонус лікарю:
                        </Text>
                    </View>
                    <Text>
                        {order.doctorBonus}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Тип замовлення:
                        </Text>
                    </View>
                    <Text>
                        {translate(order.orderType)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Коментар:
                        </Text>
                    </View>
                    <Text>
                        {order.comment}
                    </Text>
                </View>
            </OrderItemView>
        </View>
    );
}

OrderScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};