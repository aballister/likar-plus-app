import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function AppTouchable({ children, ...props }) {
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <TouchableComponent {...props}>
            {children}
        </TouchableComponent>
    );
}

AppTouchable.propTypes = {
    children: PropTypes.any.isRequired,
};