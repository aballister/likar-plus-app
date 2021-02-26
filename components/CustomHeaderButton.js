import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import theme from '../theme/theme';
import Badge from './Badge';

export default function CustomHeaderButton({ hasBadge, ...props }) {
    return (
        <View style={{ position: 'relative' }}>
            {
                hasBadge &&
                <Badge />
            }
            <HeaderButton
                {...props}
                color={theme.colors.white}
                IconComponent={MaterialIcons}
                iconSize={23}
            />
        </View>
    );
}