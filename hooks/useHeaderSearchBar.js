import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Header, useHeaderHeight } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar/SearchBar';
import { translate } from '../locale';

export default function useHeaderSearchBar(data, searchKey, sortFn) {
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const [searchBarOpened, setSearchBarOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [result, setResult] = useState(data);

    function searchQueryHandler(text) {
        setQueryIsProcessing(true);
        if (text?.length > 1) {
            const newData = data.filter((item) => {
                const itemData = item[searchKey].toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            if (sortFn) {
                newData.sort(sortFn);
            }
            setResult(newData);
        } else {
            setResult(data);
        }
        setSearchQuery(text);
        setQueryIsProcessing(false);
    }

    function searchBarToggler() {
        if (searchBarOpened) {
            searchQueryHandler();
        }
        setSearchBarOpened(state => !state);
    }

    useEffect(() => {
        setResult(data);
    }, [data]);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: headerProps => (searchBarOpened ?
                <SearchBar
                    headerHeight={headerHeight}
                    headerTop={headerProps.insets.top}
                    placeholder={translate('form.searchByLastName')}
                    queryIsProcessing={queryIsProcessing}
                    searchBarToggler={searchBarToggler}
                    searchQuery={searchQuery}
                    searchQueryHandler={searchQueryHandler}
                /> :
                <Header {...headerProps} />),
        });
    }, [navigation, searchBarOpened, searchQuery]);

    return [result, searchBarToggler];
}