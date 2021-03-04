import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    FlatList,
} from 'react-native';
import { translate } from '../../locale';
import FiltersModal from '../../components/FiltersModal/FiltersModal';
import DriversFilters from '../../components/drivers/DriversFilters';
import NoResults from '../../components/NoResults/NoResults';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import DriverThumb from '../../components/drivers/DriverThumb';
import useFetchOnFocus from '../../hooks/useFetchOnFocus';
import useHeaderMenuButton from '../../hooks/useHeaderMenuButton';
import useHeaderRightButtons from '../../hooks/useHeaderRightButtons';
import useFetch from '../../hooks/useFetch';
import useHeaderSearchBar from '../../hooks/useHeaderSearchBar';
import useFilters from '../../hooks/useFilters';

export default function DriversScreen() {
    const [filters, setFilters] = useState({});
    const [filtersOpened, setFiltersOpened] = useState(false);

    function filtersHandler(data) {
        setFilters(data);
        setFiltersOpened(false);
    }

    function filtersToggler() {
        setFiltersOpened(state => !state);
    }

    function sortResult(a, b) {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
    }

    const [result, fetchApi, isLoading] = useFetch('drivers');
    const [searchResult, searchBarToggler] = useHeaderSearchBar(result, 'lastName');
    const [filteredResult] = useFilters(searchResult, filters, sortResult);

    useFetchOnFocus(fetchApi);
    useHeaderMenuButton();
    useHeaderRightButtons(
        'DriverCreate',
        searchBarToggler,
        filtersToggler,
        Object.keys(filters).length > 0,
    );

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
                title={translate('drivers.filterDrivers')}
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
                        renderItem={({ item }) => (
                            <DriverThumb item={item} />
                        )}
                    />
            }
        </View>
    );
}

DriversScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};