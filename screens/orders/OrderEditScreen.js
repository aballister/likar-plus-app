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

export default function OrderEditScreen({ route, navigation }) {
    const {
        control, handleSubmit, errors, getValues, clearErrors, watch,
    } = useForm({
        defaultValues: {
            ...route.params.order,
            orderDate: new Date(route.params.order.orderDate),
            birthday: new Date(route.params.order.birthday),
            franchise: !!route.params.order.franchise,
        },
    });

    const onSubmit = (data) => {
        const url = `orders/${route.params.order.id}`;
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
                        iconName='save-outline'
                        onPress={handleSubmit(onSubmit)}
                        title='Save'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (watch('customer') === 'private') {
            clearErrors('guarantor');
        }
    }, [watch('customer')]);

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
                        error={errors.orderStatus}
                        label='Тип замовлення'
                        name='orderStatus'
                        options={[{ label: 'Нове', value: 'new' }, { label: 'Повторне', value: 'repeat' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        defaultValue={new Date()}
                        error={errors.orderDate}
                        label='Дата виконання'
                        name='orderDate'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='date'
                    />
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
                        defaultValue={new Date()}
                        error={errors.birthday}
                        label='Дата народження'
                        name='birthday'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='date'
                    />
                    <FormInput
                        control={control}
                        error={errors.customer}
                        label='Замовник'
                        name='customer'
                        options={[{ label: '', value: '' }, { label: 'Уніка', value: 'unica' }, { label: 'АСКА', value: 'aska' }, { label: 'Приватний', value: 'private' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        error={errors.guarantor}
                        label='Гарант'
                        name='guarantor'
                        rules={{
                            validate: (value) => {
                                let error;
                                if (getValues('customer') !== 'private' && value.length === 0) {
                                    error = 'Поле обов’язкове для заповнення';
                                }
                                return error;
                            },
                        }}
                    />
                    <FormInput
                        control={control}
                        error={errors.insurance}
                        label='Поліс'
                        name='insurance'
                    />
                    <FormInput
                        control={control}
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
                        error={errors.doctor}
                        label='Лікар'
                        name='doctor'
                        options={[{ label: '', value: '' }, { label: 'Охтень', value: '1' }, { label: 'Бочаров', value: '2' }, { label: 'Петренко', value: '3' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        error={errors.doctorBonus}
                        keyboardType='decimal-pad'
                        label='Бонус лікарю'
                        name='doctorBonus'
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

OrderEditScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};