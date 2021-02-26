import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

export default function AppPickerInput(props) {
    const {
        onBlur, onChange, value, options, ...rest
    } = props;

    function onValueChangeHandler(newValue) {
        onChange(newValue);
    }

    return (
        <Picker
            onValueChange={onValueChangeHandler}
            selectedValue={value}
            style={{ height: 50, width: 200 }}
            {...rest}
        >
            {
                options.map(option => (
                    <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))
            }
        </Picker>
    );
}

AppPickerInput.propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
};

AppPickerInput.defaultProps = {
    value: '',
};