import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { translate } from '../locale';

export default function useHeaderItemButtons() {
    const [item, editRoute, removeHandler] = arguments;
    const navigation = useNavigation();

    function editHandler() {
        navigation.navigate(editRoute, { item });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='edit'
                        onPress={editHandler}
                        title={translate('form.edit')}
                    />
                    <Item
                        iconName='delete'
                        onPress={removeHandler}
                        title={translate('form.delete')}
                    />
                </HeaderButtons>
            ),
        });
    }, [item, navigation]);
}