import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import drfProvider from '../../../providers/restProvider';

export default function OrderCreateScreen({ navigation, route }) {
    const {
        control, handleSubmit, errors, getValues, clearErrors, watch,
    } = useForm();
    const onSubmit = (data) => {
        const url = 'orders';
        drfProvider('POST', url, { ...data, orderType: route.params.orderType }, '')
            .then(() => {
                navigation.navigate('Orders');
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
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const phoneRef = useRef();
    const insuranceRef = useRef();
    const guarantorRef = useRef();

    useEffect(() => {
        if (watch('customer') === 'private') {
            clearErrors('guarantor');
        }
    }, [watch('customer')]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior='padding'
                    style={{ flex: 1 }}
                >
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
                        nextInputRef={firstNameRef}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        error={errors.firstName}
                        inputRef={firstNameRef}
                        label='Ім’я'
                        name='firstName'
                        nextInputRef={middleNameRef}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                    />
                    <FormInput
                        control={control}
                        inputRef={middleNameRef}
                        label='По-батькові'
                        name='middleName'
                        nextInputRef={phoneRef}
                    />
                    <FormInput
                        control={control}
                        error={errors.phone}
                        inputRef={phoneRef}
                        keyboardType='phone-pad'
                        label='Контактний телефон'
                        name='phone'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='phone'
                    />
                    <FormInput
                        control={control}
                        defaultValue={new Date()}
                        error={errors.date}
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
                        nextInputRef={guarantorRef}
                        options={[{ label: '', value: '' }, { label: 'Уніка', value: 'unica' }, { label: 'АСКА', value: 'aska' }, { label: 'Приватний', value: 'private' }]}
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        error={errors.guarantor}
                        inputRef={guarantorRef}
                        label='Гарант'
                        name='guarantor'
                        nextInputRef={insuranceRef}
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
                        inputRef={insuranceRef}
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
                        title='Submit'
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

OrderCreateScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};