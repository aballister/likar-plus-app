import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@react-native-community/checkbox';
import { Text, View } from 'react-native';
import AppTouchable from '../AppTouchable';

export default function AppCheckboxInput({
    onChange, value, label, ...rest
}) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Checkbox
                onValueChange={onChange}
                value={!!value}
                {...rest}
            />
            {
                label &&
                <AppTouchable onPress={() => onChange(!value)}>
                    <View style={{ flex: 1 }}>
                        <Text>
                            {label}
                        </Text>
                    </View>
                </AppTouchable>
            }
        </View>
    );
}

AppCheckboxInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
};

AppCheckboxInput.defaultProps = {
    label: '',
    value: false,
};