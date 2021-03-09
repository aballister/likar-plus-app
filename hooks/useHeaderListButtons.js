import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import CustomHeaderButton from '../components/CustomHeaderButton';

export default function useHeaderListButtons() {
    const [createScreen, searchBarToggler, filtersToggler, hasBadge] = arguments;
    const navigation = useNavigation();

    function addHandler() {
        navigation.navigate(createScreen);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='search'
                        onPress={searchBarToggler}
                        title='search'
                    />
                    {
                        filtersToggler &&
                        <Item
                            hasBadge={hasBadge}
                            iconName='filter-alt'
                            onPress={filtersToggler}
                            title='filters'
                        />
                    }
                    <Item
                        iconName='add'
                        onPress={addHandler}
                        title='add'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation, hasBadge]);
}