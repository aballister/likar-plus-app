import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import inputs from '../inputs';
import { FormInputView, InputView, InputWrapperView } from './FormInput.style';

export default function FormInput(props) {
    const {
        control, name, rules, defaultValue, error, returnKeyType, type,
        label, ...rest
    } = props;

    const Input = inputs[type];

    return (
        <FormInputView>
            {
                label.length > 0 &&
                <Text>
                    {label}
                </Text>
            }
            <InputWrapperView>
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={name}
                    render={({ onChange, onBlur, value }) => (
                        <InputView
                            as={Input}
                            onBlur={onBlur}
                            onChange={onChange}
                            returnKeyType={returnKeyType}
                            value={value}
                            {...rest}
                        />
                    )}
                    rules={rules}
                />
                {
                    error &&
                    <Text>
                        {error.message}
                    </Text>
                }
            </InputWrapperView>
        </FormInputView>
    );
}

FormInput.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string, PropTypes.bool, PropTypes.object, PropTypes.instanceOf(Date),
    ]),
    error: PropTypes.object,
    label: PropTypes.string,
    returnKeyType: PropTypes.string,
    rules: PropTypes.object,
    type: PropTypes.string,
};

FormInput.defaultProps = {
    defaultValue: '',
    error: undefined,
    label: '',
    returnKeyType: 'done',
    rules: undefined,
    type: 'text',
};