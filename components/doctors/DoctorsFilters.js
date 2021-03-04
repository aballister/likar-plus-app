import React, { useEffect } from 'react';
import {
    Button, KeyboardAvoidingView, Platform, Text, View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import isEqualWith from 'lodash.isequalwith';
import FormInput from '../FormInput/FormInput';
import Collapsible from '../Collapsible';
import dateComparison from '../../utils';

export default function DoctorsFilters({ filtersHandler, filters }) {
    const defaultValues = {
        specialization: { label: '', value: '' },
        districts: {
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
        },
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
                    label='Спеціалізація'
                    name='specialization'
                    type='picker'
                    options={[{ label: '', value: '' }, { label: 'Сімейний', value: '1' }, { label: 'Терапевт', value: '2' }, { label: 'Педіатр', value: '3' }, { label: 'Травматолог', value: '4' }]}
                />
                <Collapsible title='Райони'>
                    <FormInput
                        control={control}
                        name='districts'
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