import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Alert, Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import FormInput from '../../components/FormInput';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';

export default function DriverEditScreen({ route, navigation }) {
    const {
        control, handleSubmit, errors,
    } = useForm({
        defaultValues: {
            ...route.params.driver,
            birthday: new Date(route.params.driver.birthday),
        },
    });

    const onSubmit = (data) => {
        const url = `drivers/${route.params.driver.id}`;
        drfProvider('PATCH', url, data, '')
            .then(() => {
                navigation.goBack();
            }).catch((error) => {
                Alert.alert(
                    'Some shit happened',
                    `${error.status}`,
                    [
                        {
                            text: 'OK',
                        },
                    ],
                );
            });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='save'
                        onPress={handleSubmit(onSubmit)}
                        title='Save'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                    style={{ flex: 1, padding: 10 }}
                >
                    <FormInput
                        control={control}
                        error={errors.lastName}
                        label='Прізвище'
                        name='lastName'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.firstName}
                        label='Ім’я'
                        name='firstName'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        label='По-батькові'
                        name='middleName'
                    />
                    <FormInput
                        control={control}
                        error={errors.phone}
                        keyboardType='phone-pad'
                        label='Контактний телефон'
                        name='phone'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='phone'
                    />
                    <FormInput
                        control={control}
                        defaultValue='600'
                        error={errors.dayPrice}
                        keyboardType='decimal-pad'
                        label='Послуги до 18:00 (грн)'
                        name='dayPrice'
                    />
                    <FormInput
                        control={control}
                        defaultValue='900'
                        error={errors.eveningPrice}
                        keyboardType='decimal-pad'
                        label='Послуги після 18:00 (грн)'
                        name='eveningPrice'
                    />
                    <FormInput
                        control={control}
                        defaultValue='50'
                        error={errors.lessFive}
                        keyboardType='decimal-pad'
                        label='0-5 викликів (%)'
                        name='lessFive'
                    />
                    <FormInput
                        control={control}
                        defaultValue='75'
                        error={errors.lessEleven}
                        keyboardType='decimal-pad'
                        label='6-10 викликів (%)'
                        name='lessTen'
                    />
                    <FormInput
                        control={control}
                        defaultValue='100'
                        error={errors.aboveEleven}
                        keyboardType='decimal-pad'
                        label='11+ викликів (%)'
                        name='aboveEleven'
                    />
                    <FormInput
                        control={control}
                        error={errors.comment}
                        label='Коментар'
                        multiline
                        name='comment'
                    />
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        title='Зберегти'
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

DriverEditScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};