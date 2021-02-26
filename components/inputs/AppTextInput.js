import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

export default function AppTextInput(props) {
    const {
        onBlur, onChange, value, ...rest
    } = props;

    return (
        <TextInput
            autoCompleteType='off'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
        />
    );
}

AppTextInput.propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

AppTextInput.defaultProps = {
    value: '',
};