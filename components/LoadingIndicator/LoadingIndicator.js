import React from 'react';
import { ActivityIndicator } from 'react-native';
import LoadingIndicatorView from './LoadingIndicator.style';
import theme from '../../theme/theme';

export default function LoadingIndicator() {
    return (
        <LoadingIndicatorView>
            <ActivityIndicator
                color={theme.colors.black}
                size='large'
            />
        </LoadingIndicatorView>
    );
}