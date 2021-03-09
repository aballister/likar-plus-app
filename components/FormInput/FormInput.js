import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from 'react-native';
import inputs from '../inputs';
import { FormInputView, InputView, InputWrapperView } from './FormInput.style';
import { translate } from '../../locale';

export default function FormInput({ name, field, ...rest }) {
    const { control, errors } = useFormContext();

    const Input = inputs[field.fieldType ?? 'text'];

    const label = !field.noLabel ? translate(`form.${name}`) : '';

    let rules;
    if (field.validation?.length) {
        rules = {
            required: translate('validation.required'),
        };
    }

    return (
        <FormInputView>
            {
                label &&
                <Text>
                    {label}
                </Text>
            }
            <InputWrapperView>
                <Controller
                    control={control}
                    defaultValue={field.defaultValue ?? ''}
                    name={name}
                    render={({ onChange, onBlur, value }) => (
                        <InputView
                            as={Input}
                            keyboardType={field.keyboardType}
                            onBlur={onBlur}
                            onChange={onChange}
                            returnKeyType={field.returnKeyType ?? 'done'}
                            value={value}
                            {...rest}
                        />
                    )}
                    rules={rules}
                />
                {
                    errors[name] &&
                    <Text>
                        {errors[name].message}
                    </Text>
                }
            </InputWrapperView>
        </FormInputView>
    );
}

FormInput.propTypes = {
    field: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};