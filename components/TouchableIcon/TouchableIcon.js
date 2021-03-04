import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import AppTouchable from '../AppTouchable';
import { TouchableIconInnerView, TouchableIconView } from './TouchableIcon.style';
import theme from '../../theme/theme';

export default function TouchableIcon(props) {
    const {
        size, onPress, iconSize, name, color, touchableProps,
    } = props;

    return (
        <TouchableIconView size={size}>
            <AppTouchable
                activeOpacity={0.3}
                background={TouchableNativeFeedback.Ripple(theme.colors.iconRipple)}
                onPress={onPress}
                {...touchableProps}
            >
                <TouchableIconInnerView size={size}>
                    <Icon
                        color={color}
                        name={name}
                        size={iconSize}
                    />
                </TouchableIconInnerView>
            </AppTouchable>
        </TouchableIconView>
    );
}

TouchableIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    iconSize: PropTypes.number,
    size: PropTypes.number,
    touchableProps: PropTypes.object,
};

TouchableIcon.defaultProps = {
    color: theme.colors.iconColor,
    iconSize: 23,
    size: 36,
    touchableProps: {},
};