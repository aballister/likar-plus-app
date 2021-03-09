import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { translate } from '../../locale';
import FiltersModal from '../../components/FiltersModal/FiltersModal';
import DriversFilters from '../../components/drivers/DriversFilters';
import NoResults from '../../components/NoResults/NoResults';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import useFetchOnFocus from '../../hooks/useFetchOnFocus';
import useHeaderMenuButton from '../../hooks/useHeaderMenuButton';
import useHeaderListButtons from '../../hooks/useHeaderListButtons';
import useFetch from '../../hooks/useFetch';
import useHeaderSearchBar from '../../hooks/useHeaderSearchBar';
import useFilters from '../../hooks/useFilters';
import ListItem from '../../components/ListItem/ListItem';
import useSettings from '../../hooks/useSettings';

export default function DriversScreen() {
    const settings = useSettings();
    const [filters, setFilters] = useState({});
    const [filtersOpened, setFiltersOpened] = useState(false);

    function filtersHandler(data) {
        setFilters(data);
        setFiltersOpened(false);
    }

    function filtersToggler() {
        setFiltersOpened(state => !state);
    }

    function sortFunction(a, b) {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
    }

    const [result, fetchApi, isLoading] = useFetch(settings.resource);
    const [searchResult, searchBarToggler] = useHeaderSearchBar(result, settings.searchKey);
    const [filteredResult] = useFilters(searchResult, filters, sortFunction);

    useFetchOnFocus(fetchApi);
    useHeaderMenuButton();
    useHeaderListButtons(
        settings.create.screen,
        searchBarToggler,
        filtersToggler,
        Object.keys(filters).length > 0,
    );

    function renderItem({ item }) {
        return (
            <ListItem
                fields={settings.list.fields}
                item={item}
                routeTo={settings.page.screen}
                title={settings.list.titleFields}
            />
        );
    }

    if (!filteredResult.length && isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <View>
            <FiltersModal
                filtersToggler={filtersToggler}
                isVisible={filtersOpened}
                title={translate(settings.filter.title)}
            >
                <DriversFilters
                    filters={filters}
                    filtersHandler={filtersHandler}
                />
            </FiltersModal>
            {
                !filteredResult.length ?
                    <NoResults /> :
                    <FlatList
                        data={filteredResult}
                        onRefresh={fetchApi}
                        refreshing={isLoading}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}