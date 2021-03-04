import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Alert, Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import FormInput from '../../components/FormInput/FormInput';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';

export default function DoctorEditScreen({ route, navigation }) {
    const {
        control, handleSubmit, errors, getValues, clearErrors, watch,
    } = useForm({
        defaultValues: {
            ...route.params.doctor,
            birthday: new Date(route.params.doctor.birthday),
        },
    });

    const onSubmit = (data) => {
        const url = `doctors/${route.params.doctor.id}`;
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
                        defaultValue={new Date()}
                        error={errors.birthday}
                        label='Дата народження'
                        name='birthday'
                        rules={{ required: 'Поле обов’язкове для заповнення' }}
                        type='date'
                    />
                    <FormInput
                        control={control}
                        error={errors.patientsAge}
                        keyboardType='numeric'
                        label='Вік пацієнтів (від)'
                        name='patientsAge'
                    />
                    <FormInput
                        control={control}
                        error={errors.doctor}
                        label='Спеціалізація'
                        name='specialization'
                        options={[{ label: '', value: '' }, { label: 'Сімейний', value: '1' }, { label: 'Терапевт', value: '2' }, { label: 'Педіатр', value: '3' }, { label: 'Травматолог', value: '4' }]}
                        type='picker'
                    />
                    <FormInput
                        control={control}
                        defaultValue={{
                            'in-house': false,
                            online: false,
                            clinic: false,
                        }}
                        label='Послуги'
                        name='services'
                        type='checkboxGroup'
                    />
                    {
                        watch('services')?.['in-house'] ?
                            <FormInput
                                control={control}
                                defaultValue={{
                                    Darnytskyi: false,
                                    Desnianskyi: false,
                                    Dniprovskyi: false,
                                    Holosiivskyi: false,
                                    Obolonskyi: false,
                                    Pecherskyi: false,
                                    Podilskyi: false,
                                    Shevchenkivskyi: false,
                                    Solomianskyi: false,
                                    Sviatoshynskyi: false,
                                    Brovary: false,
                                    Boryspil: false,
                                }}
                                label='Райони'
                                name='districts'
                                type='checkboxGroup'
                            /> :
                            null
                    }
                    {
                        watch('services')?.['in-house'] &&
                        <FormInput
                            control={control}
                            defaultValue='220'
                            error={errors['in-house-price']}
                            keyboardType='decimal-pad'
                            label='Вартість виклику на дім (грн)'
                            name='in-house-price'
                            rules={{ required: 'Поле обов’язкове для заповнення' }}
                        />
                    }
                    {
                        watch('services')?.online &&
                        <FormInput
                            control={control}
                            defaultValue='150'
                            error={errors['online-price']}
                            keyboardType='decimal-pad'
                            label='Вартість телемедицини (грн)'
                            name='online-price'
                            rules={{ required: 'Поле обов’язкове для заповнення' }}
                        />
                    }
                    {
                        watch('services')?.clinic &&
                        <FormInput
                            control={control}
                            defaultValue='220'
                            error={errors['clinic-price']}
                            keyboardType='decimal-pad'
                            label='Вартість прийому (грн)'
                            name='clinic-price'
                            rules={{ required: 'Поле обов’язкове для заповнення' }}
                        />
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

DoctorEditScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};