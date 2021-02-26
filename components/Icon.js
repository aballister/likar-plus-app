import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

export default function Icon(props) {
    return (
        <MaterialIcons
            color={theme.colors.white}
            size={23}
            {...props}
        />
    );
}