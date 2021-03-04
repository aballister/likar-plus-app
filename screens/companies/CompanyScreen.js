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
import { CompanyItemView } from './Companies.style';
import { translate } from '../../locale';

export default function CompanyScreen({ route, navigation }) {
    const { company } = route.params;

    function removeCompanyHandler() {
        drfProvider('DELETE', `companies/${company.id}`)
            .then(() => {
                navigation.navigate('Company');
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
                        onPress={() => navigation.navigate('CompanyEdit', {
                            company,
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
                                { text: 'Видалити', onPress: removeCompanyHandler },
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
            <CompanyItemView>
                <Text style={{ fontSize: 18 }}>
                    {company.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Договір:
                        </Text>
                    </View>
                    <Text>
                        {company.contract}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Гаряча лінія:
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {company.phone}
                        </Text>
                        <Text>
                            {company.phone2}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Адреса:
                        </Text>
                    </View>
                    <Text style={{ flex: 1 }}>
                        {`${company.city}, ${translate(company.streetType)}. ${company.street}, буд. ${company.house}, поверх ${company.floor}, кв. ${company.flat}`}
                    </Text>
                </View>
                <Text>Контактна особа:</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            {company.position}
                        </Text>
                    </View>
                    <Text>
                        {`${company.lastName} ${company.firstName} ${company.middleName}`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {company.managerPhone}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            E-mail:
                        </Text>
                    </View>
                    <Text>
                        {company.email}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Коментар:
                        </Text>
                    </View>
                    <Text>
                        {company.comment}
                    </Text>
                </View>
            </CompanyItemView>
        </View>
    );
}

CompanyScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};