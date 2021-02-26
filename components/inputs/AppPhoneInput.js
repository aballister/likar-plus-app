import React from 'react';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';

export default function AppPhoneInput(props) {
    const {
        onBlur, onChange, value, ...rest
    } = props;

    return (
        <TextInputMask
            maxLength={18}
            onBlur={onBlur}
            onChangeText={onChange}
            options={{
                mask: '+380 (99) 999-9999',
            }}
            type='custom'
            value={value}
            {...rest}
        />
    );
}

AppPhoneInput.propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

AppPhoneInput.defaultProps = {
    value: '',
};