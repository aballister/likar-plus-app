import React, { useEffect } from 'react';
import {
    Button, KeyboardAvoidingView, Platform, Text, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import isEqualWith from 'lodash.isequalwith';
import FormInput from '../FormInput';
import Collapsible from '../Collapsible';
import dateComparison from '../../utils';

export default function OrdersFilters({ filtersHandler, filters }) {
    const monthAgo = new Date(new Date().setMonth(-1));
    const defaultValues = {
        ordersDateStart: monthAgo,
        ordersDateEnd: new Date(),
        customer: { unica: false, aska: false },
        orderType: { 'in-house': false, online: false, clinic: false },
    };

    const {
        control, handleSubmit, errors, watch, reset, setValue,
    } = useForm({ defaultValues });

    useEffect(() => {
        Object.keys(filters).forEach((filter) => {
            setValue(filter, filters[filter]);
        });
    }, []);

    function onSubmit(data) {
        filtersHandler(!isEqualWith(data, defaultValues, dateComparison) ? data : {});
    }

    function onClear() {
        reset(defaultValues);
        filtersHandler({});
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                style={{ flex: 1, padding: 10 }}
            >
                <FormInput
                    control={control}
                    error={errors.ordersDateStart}
                    label='Дата замовлення з'
                    maximumDate={new Date(watch('ordersDateEnd') || '')}
                    name='ordersDateStart'
                    type='date'
                />
                <FormInput
                    control={control}
                    error={errors.ordersDateEnd}
                    label='Дата замовлення по'
                    minimumDate={new Date(watch('ordersDateStart') || monthAgo)}
                    name='ordersDateEnd'
                    type='date'
                />
                <Collapsible title='Замовник'>
                    <FormInput
                        control={control}
                        name='customer'
                        type='checkboxGroup'
                    />
                </Collapsible>
                <Collapsible title='Тип замовлення'>
                    <FormInput
                        control={control}
                        name='orderType'
                        type='checkboxGroup'
                    />
                </Collapsible>
            </KeyboardAvoidingView>
            <View style={{
                flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, backgroundColor: 'red', width: '100%',
            }}
            >
                <View style={{ width: '50%' }}>
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        title='Фільтрувати'
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <Button
                        color='red'
                        onPress={onClear}
                        title='Очистити'
                    />
                </View>
            </View>
        </View>
    );
}