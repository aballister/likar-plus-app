import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { translate } from '../locale';

export default function useHeaderSaveButton(submitHandler) {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='save'
                        onPress={submitHandler}
                        title={translate('form.save')}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);
}