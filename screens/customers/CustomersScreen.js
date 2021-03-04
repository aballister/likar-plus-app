import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {
    HeaderButtons, Item,
} from 'react-navigation-header-buttons';
import { SearchBar } from 'react-native-elements';
import { Header, useHeaderHeight } from '@react-navigation/stack';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import AppTouchable from '../../components/AppTouchable';
import CustomersFilters from '../../components/customers/CustomersFilters';
import { CustomerItemView } from './Customers.style';
import { translate } from '../../locale';
import FiltersModal from '../../components/FiltersModal/FiltersModal';
import NoResults from '../../components/NoResults/NoResults';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default function CustomersScreen({ navigation }) {
    const [customers, setCustomers] = useState([]);
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [finalCustomers, setFinalCustomers] = useState([]);
    const [filters, setFilters] = useState({});
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [searchBarOpened, setSearchBarOpened] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function filtersHandler(data) {
        setFilters(data);
        setFiltersOpened(false);
    }

    function filtersToggler() {
        setFiltersOpened(state => !state);
    }

    function searchQueryHandler(text) {
        setQueryIsProcessing(true);
        if (text?.length > 1) {
            const newData = filteredCustomers.filter((item) => {
                const itemData = item.lastName.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
            setFinalCustomers(newData);
        } else {
            setFinalCustomers(filteredCustomers);
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
        let newCustomers = customers;
        if (Object.keys(filters).length) {
            if (Object.values(filters.districts).find(el => el)) {
                const trueDistricts = (Object.keys(filters.districts)
                    .filter(district => filters.districts[district]));
                newCustomers = newCustomers.filter(el => Object.keys(el.districts)
                    .filter(district => el.districts[district])
                    .some(district => trueDistricts.includes(district)));
            }
            if (filters.specialization) {
                newCustomers = newCustomers
                    .filter(el => el.specialization === filters.specialization);
            }
            newCustomers = newCustomers.sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
        }
        setFilteredCustomers(newCustomers);
        setFinalCustomers(newCustomers);
    }, [filters]);

    const headerHeight = useHeaderHeight();
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
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='menu'
                        onPress={navigation.toggleDrawer}
                        title='Menu'
                    />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='search'
                        onPress={searchBarToggler}
                        title='search'
                    />
                    <Item
                        hasBadge={Object.keys(filters).length > 0}
                        iconName='filter-alt'
                        onPress={filtersToggler}
                        title='filters'
                    />
                    <Item
                        iconName='add'
                        onPress={() => navigation.navigate('CustomerCreate')}
                        title='add'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation, searchBarOpened, searchQuery]);

    function getCustomers() {
        console.log('customers fetched');
        setIsLoading(true);
        setRefreshing(true);
        drfProvider('GET', 'customers')
            .then((result) => {
                const mappedResult = Object.keys(result).map(customerId => ({
                    id: customerId,
                    ...result[customerId],
                })).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
                setCustomers(mappedResult);
                setFilteredCustomers(mappedResult);
                setFinalCustomers(mappedResult);
                setIsLoading(false);
                setRefreshing(false);
            })
            .catch((error) => {
                Alert.alert(
                    'Some shit happened',
                    `${JSON.stringify(error)}`,
                    [
                        {
                            text: 'OK',
                        },
                    ],
                );
            });
    }

    useEffect(() => {
        navigation.addListener('focus', getCustomers);
        return () => {
            navigation.removeListener('focus', getCustomers);
        };
    }, [navigation]);

    function renderItem({ item }) {
        function navigateTo() {
            navigation.navigate('Customer', {
                customer: item,
            });
        }

        return (
            <AppTouchable onPress={navigateTo}>
                <CustomerItemView>
                    <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10 }}>
                            {item.company}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {item.insurance}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 18 }}>
                        {`${item.lastName} ${item.firstName} ${item.middleName}`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Телефон:
                            </Text>
                        </View>
                        <Text>
                            {item.phone}
                        </Text>
                    </View>
                </CustomerItemView>
            </AppTouchable>
        );
    }

    if (!finalCustomers.length && isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <View>
            <FiltersModal
                filtersToggler={filtersToggler}
                isVisible={filtersOpened}
                title={translate('customers.filterCustomers')}
            >
                <CustomersFilters
                    filters={filters}
                    filtersHandler={filtersHandler}
                />
            </FiltersModal>
            {
                !finalCustomers.length ?
                    <NoResults /> :
                    <FlatList
                        data={finalCustomers}
                        onRefresh={getCustomers}
                        refreshing={refreshing}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}

CustomersScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};