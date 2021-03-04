import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import drfProvider from '../../providers/restProvider';
import FormInput from '../FormInput/FormInput';
import { translate } from '../../locale';
import { requestErrorHandler } from '../../utils';
import useHeaderSaveButton from '../../hooks/useHeaderSaveButton';

export default function DriverForm({ route, navigation }) {
    const { driver } = route.params;
    let defaultValues = {};
    let method = 'POST';
    let url = 'drivers';
    let requestCallback = () => navigation.navigate('Drivers');
    if (Object.keys(driver).length) {
        method = 'PATCH';
        url = `drivers/${driver.id}`;
        requestCallback = updatedDriver => navigation.navigate('Driver', {
            driver: updatedDriver,
        });
        defaultValues = {
            ...driver,
            birthday: new Date(driver.birthday),
        };
    }

    const {
        control, handleSubmit, errors,
    } = useForm({
        defaultValues,
    });

    function submitHandler(data) {
        drfProvider(method, url, data, '')
            .then(requestCallback)
            .catch(requestErrorHandler);
    }

    useHeaderSaveButton(handleSubmit(submitHandler));

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
                        onPress={handleSubmit(submitHandler)}
                        title={translate('form.save')}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

DriverForm.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};