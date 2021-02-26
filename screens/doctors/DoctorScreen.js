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
import { DoctorItemView } from './Doctors.style';

export default function DoctorScreen({ route, navigation }) {
    const { doctor } = route.params;

    function removeDoctorHandler() {
        drfProvider('DELETE', `doctors/${doctor.id}`)
            .then(() => {
                navigation.navigate('Doctors');
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
                        onPress={() => navigation.navigate('DoctorEdit', {
                            doctor,
                        })}
                        title='Edit'
                    />
                    <Item
                        iconName='delete'
                        onPress={() => Alert.alert(
                            'Видалити лікаря?',
                            'Підтвердіть видалення лікаря',
                            [
                                {
                                    text: 'Відміна',
                                    style: 'cancel',
                                },
                                { text: 'Видалити', onPress: removeDoctorHandler },
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
            <DoctorItemView>
                <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10 }}>
                        {`Спеціалізація: ${doctor.specialization}`}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {`Послуги: ${Object.keys(doctor.services).filter(service => doctor.services[service]).join(', ')}`}
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    {`${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Телефон:
                        </Text>
                    </View>
                    <Text>
                        {doctor.phone}
                    </Text>
                </View>
                {
                    doctor.districts &&
                        Object.keys(doctor.districts).length > 0 &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 130 }}>
                                <Text>
                                    Райони:
                                </Text>
                            </View>
                            <Text>
                                {
                                    Object.keys(doctor.districts)
                                        .filter(district => doctor.districts[district]).join(', ')
                                }
                            </Text>
                        </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Дата народження:
                        </Text>
                    </View>
                    <Text>
                        {format(new Date(doctor.birthday), 'dd.MM.yyyy')}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Вік пацієнтів (від):
                        </Text>
                    </View>
                    <Text>
                        {doctor.patientsAge}
                    </Text>
                </View>
                {
                    Object.keys(doctor.services)
                        .filter(service => doctor.services[service])
                        .map(service => (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 130 }}>
                                    <Text>
                                        {service}
                                    </Text>
                                </View>
                                <Text>
                                    {doctor[`${service}-price`]} грн
                                </Text>
                            </View>
                        ))
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 130 }}>
                        <Text>
                            Коментар:
                        </Text>
                    </View>
                    <Text>
                        {doctor.comment}
                    </Text>
                </View>
            </DoctorItemView>
        </View>
    );
}

DoctorScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};