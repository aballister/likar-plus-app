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
import { DriverItemView } from './Drivers.style';

export default function DriverScreen({ route, navigation }) {
    const { driver } = route.params;

    function removeDriverHandler() {
        drfProvider('DELETE', `drivers/${driver.id}`)
            .then(() => {
                navigation.navigate('Drivers');
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
                        onPress={() => navigation.navigate('DriverEdit', {
                            driver,
                        })}
                        title='Edit'
                    />
                    <Item
                        iconName='delete'
                        onPress={() => Alert.alert(
                            'Видалити водія?',
                            'Підтвердіть видалення водія',
                            [
                                {
                                    text: 'Відміна',
                                    style: 'cancel',
                                },
                                { text: 'Видалити', onPress: removeDriverHandler },
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
            <DriverItemView>
                <Text style={{ fontSize: 18 }}>
                    {`${driver.lastName} ${driver.firstName} ${driver.middleName}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {driver.phone}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Послуги до 18:00 (грн):
                        </Text>
                    </View>
                    <Text>
                        {driver.dayPrice}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Послуги після 18:00 (грн):
                        </Text>
                    </View>
                    <Text>
                        {driver.eveningPrice}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            0-5 викликів (%):
                        </Text>
                    </View>
                    <Text>
                        {driver.lessFive}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            6-10 викликів (%):
                        </Text>
                    </View>
                    <Text>
                        {driver.lessTen}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            11+ викликів (%):
                        </Text>
                    </View>
                    <Text>
                        {driver.aboveEleven}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Коментар:
                        </Text>
                    </View>
                    <Text>
                        {driver.comment}
                    </Text>
                </View>
            </DriverItemView>
        </View>
    );
}

DriverScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};