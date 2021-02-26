import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import inputs from './inputs';

export default function FormInput(props) {
    const {
        control, name, rules, defaultValue, error, nextInputRef, inputRef, returnKeyType, type,
        label, ...rest
    } = props;

    function onSubmitEditingHandler() {
        if (nextInputRef) {
            if (nextInputRef.current.focus) {
                nextInputRef.current.focus();
            /* eslint-disable no-underscore-dangle */
            } else if (nextInputRef.current._inputElement.focus) {
                nextInputRef.current._inputElement.focus();
            }
            /* eslint-enable no-underscore-dangle */
        }
    }

    const Input = inputs[type];

    return (
        <View>
            {
                label.length > 0 &&
                <Text>
                    {label}
                </Text>
            }
            <Controller
                control={control}
                defaultValue={defaultValue}
                name={name}
                render={({ onChange, onBlur, value }) => (
                    <Input
                        inputRef={inputRef}
                        nextInputRef={nextInputRef}
                        onBlur={onBlur}
                        onChange={onChange}
                        onSubmitEditing={onSubmitEditingHandler}
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
        </View>
    );
}

FormInput.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    error: PropTypes.object,
    inputRef: PropTypes.object,
    label: PropTypes.string,
    nextInputRef: PropTypes.object,
    returnKeyType: PropTypes.string,
    rules: PropTypes.object,
    type: PropTypes.string,
};

FormInput.defaultProps = {
    defaultValue: '',
    error: undefined,
    inputRef: undefined,
    label: '',
    nextInputRef: undefined,
    returnKeyType: 'done',
    rules: undefined,
    type: 'text',
};