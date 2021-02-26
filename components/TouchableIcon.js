import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';
import AppTouchable from './AppTouchable';

export default function TouchableIcon(props) {
    const {
        containerStyle, size, onPress, iconSize, name, color, touchableProps,
    } = props;

    return (
        <View style={{
            overflow: 'hidden',
            borderRadius: size / 2,
            ...containerStyle,
        }}
        >
            <AppTouchable onPress={onPress} {...touchableProps}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: size,
                    width: size,
                }}
                >
                    <Icon
                        color={color}
                        name={name}
                        size={iconSize}
                    />
                </View>
            </AppTouchable>
        </View>
    );
}

TouchableIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    containerStyle: PropTypes.object,
    iconSize: PropTypes.number,
    size: PropTypes.number,
    touchableProps: PropTypes.object,
};

TouchableIcon.defaultProps = {
    color: 'rgba(0, 0, 0, 0.54)',
    containerStyle: {},
    iconSize: 23,
    size: 36,
    touchableProps: {},
};