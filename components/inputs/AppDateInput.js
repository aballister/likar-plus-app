import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from 'react-native';
import AppTouchable from '../AppTouchable';

export default function AppDateInput(props) {
    const {
        onBlur, onChange, value, style, ...rest
    } = props;
    const [pickerShown, setPickerShown] = useState(false);

    function showPickerHandler() {
        setPickerShown(state => !state);
    }

    function onChangeHandler(e, date) {
        setPickerShown(false);
        if (date) {
            onChange(date);
        }
    }

    return (
        <View style={style}>
            <AppTouchable onPress={showPickerHandler}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                    <Text>
                        {value && format(value, 'dd.MM.yyyy')}
                    </Text>
                </View>
            </AppTouchable>
            {
                pickerShown &&
                <DateTimePicker
                    maximumDate={new Date()}
                    minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)}
                    mode='date'
                    onChange={onChangeHandler}
                    value={value}
                    {...rest}
                />
            }
        </View>
    );
}

AppDateInput.propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    style: PropTypes.array,
};

AppDateInput.defaultProps = {
    style: [],
};