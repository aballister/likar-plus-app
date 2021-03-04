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

export default function CompanyCreateScreen({ navigation }) {
    const {
        control, handleSubmit, errors, clearErrors, watch,
    } = useForm();

    const onSubmit = (data) => {
        const url = 'companies';
        drfProvider('POST', url, data, '')
            .then(() => {
                navigation.navigate('Companies');
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
                        error={errors.name}
                        label='Назва'
                        name='name'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.phone}
                        keyboardType='phone-pad'
                        label='Гаряча лінія'
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
                        error={errors.contract}
                        label='Номер договору'
                        name='contract'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        label='Договір'
                        name='contract'
                        type='document'
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
                        keyboardType='numeric'
                        label='Поверх'
                        name='floor'
                    />
                    <FormInput
                        control={control}
                        error={errors.flat}
                        keyboardType='numeric'
                        label='Квартира/офіс'
                        name='flat'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <Text>Контактна особа:</Text>
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
                        error={errors.position}
                        label='Посада'
                        name='position'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.managerPhone}
                        keyboardType='phone-pad'
                        label='Контактний телефон'
                        name='managerPhone'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='phone'
                    />
                    <FormInput
                        control={control}
                        error={errors.email}
                        keyboardType='email-address'
                        label='E-mail'
                        name='email'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='email'
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

CompanyCreateScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};