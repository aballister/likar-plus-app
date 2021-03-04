import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Alert, Platform, Text,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import FormInput from '../../components/FormInput/FormInput';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';

export default function CustomerCreateScreen({ navigation }) {
    const {
        control, handleSubmit, errors, clearErrors, watch,
    } = useForm();
    const onSubmit = (data) => {
        const url = 'customers';
        drfProvider('POST', url, data, '')
            .then(() => {
                navigation.navigate('Customers');
            }).catch((error) => {
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
                        defaultValue='Київ'
                        error={errors.city}
                        label='Місто'
                        name='city'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        defaultValue='street'
                        error={errors.streetType}
                        label='Тип вулиці'
                        name='streetType'
                        options={[{ label: 'вул', value: 'street' }, { label: 'пров', value: 'lane' }, { label: 'просп', value: 'avenue' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        error={errors.street}
                        label='Вулиця'
                        name='street'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.house}
                        keyboardType='numeric'
                        label='Будинок'
                        name='house'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        defaultValue='1'
                        error={errors.entrance}
                        keyboardType='numeric'
                        label='Під’їзд'
                        name='entrance'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.floor}
                        keyboardType='numeric'
                        label='Поверх'
                        name='floor'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.flat}
                        keyboardType='numeric'
                        label='Квартира'
                        name='flat'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
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
                        keyboardType='phone-pad'
                        label='Додатковий номер телефону'
                        name='phone2'
                        type='phone'
                    />
                    <FormInput
                        control={control}
                        defaultValue={new Date()}
                        error={errors.birthday}
                        label='Дата народження'
                        name='birthday'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='date'
                    />
                    <FormInput
                        control={control}
                        error={errors.company}
                        label='Страхова компанія'
                        name='company'
                        options={[{ label: '', value: '' }, { label: 'Уніка', value: 'unica' }, { label: 'АСКА', value: 'aska' }, { label: 'Приватний', value: 'private' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        error={errors.insurance}
                        label='Поліс'
                        name='insurance'
                    />
                    <FormInput
                        control={control}
                        defaultValue={false}
                        label='Франшиза'
                        name='franchise'
                        type='switch'
                    />
                    {
                        watch('franchise') ?
                            <FormInput
                                control={control}
                                error={errors.franchiseValue}
                                name='franchiseValue'
                                rules={{ required: 'Поле обов’язкове для заповнення' }}
                            /> :
                            null
                    }
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

CustomerCreateScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};