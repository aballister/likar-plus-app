import React from 'react';
import PropTypes from 'prop-types';
import AppCheckboxInput from './AppCheckboxInput';

export default function AppCheckboxGroupInput({ onChange, value, ...rest }) {
    function valueChangeHandler(key, val) {
        const newVal = { ...value };
        newVal[key] = val;
        onChange(newVal);
    }

    return Object.keys(value).map(key => (
        <AppCheckboxInput
            key={key}
            label={key}
            onChange={val => valueChangeHandler(key, val)}
            value={!!value[key]}
            {...rest}
        />
    ));
}

AppCheckboxGroupInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
};

AppCheckboxGroupInput.defaultProps = {
    value: {},
};