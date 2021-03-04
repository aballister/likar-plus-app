import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { translate } from '../locale';

export default function useHeaderMenuButton() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='menu'
                        onPress={navigation.toggleDrawer}
                        title={translate('menu')}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);
}