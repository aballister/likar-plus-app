import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-native';

export default function AppSwitchInput({ onChange, value, ...rest }) {
    return (
        <Switch
            onValueChange={onChange}
            value={!!value}
            {...rest}
        />
    );
}

AppSwitchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
};

AppSwitchInput.defaultProps = {
    value: false,
};