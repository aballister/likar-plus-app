import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DriverItemView } from '../../screens/drivers/Drivers.style';
import AppTouchable from '../AppTouchable';

export default function DriverThumb({ item }) {
    const navigation = useNavigation();

    function navigateTo() {
        navigation.navigate('Driver', {
            driver: item,
        });
    }

    return (
        <AppTouchable onPress={navigateTo}>
            <DriverItemView>
                <Text style={{ fontSize: 18 }}>
                    {`${item.lastName} ${item.firstName} ${item.middleName}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {item.phone}
                    </Text>
                </View>
            </DriverItemView>
        </AppTouchable>
    );
}

DriverThumb.propTypes = {
    item: PropTypes.object.isRequired,
};