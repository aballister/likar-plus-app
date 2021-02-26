import React from 'react';
import PropTypes from 'prop-types';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';

export default function Anchor(props) {
    const {
        onPress, href, children, ...rest
    } = props;

    function onPressHandler() {
        Linking.openURL(href);
        if (onPress) {
            onPress();
        }
    }

    return (
        <Text
            {...rest}
            onPress={onPressHandler}
        >
            {children}
        </Text>
    );
}

Anchor.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    href: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

Anchor.defaultProps = {
    onPress: undefined,
};