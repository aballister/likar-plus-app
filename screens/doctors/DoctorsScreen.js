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
import { DoctorItemView } from './Doctors.style';
import AppTouchable from '../../components/AppTouchable';
import DoctorsFilters from '../../components/doctors/DoctorsFilters';
import { translate } from '../../locale';
import FiltersModal from '../../components/FiltersModal/FiltersModal';
import NoResults from '../../components/NoResults/NoResults';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default function DoctorsScreen({ navigation }) {
    const [doctors, setDoctors] = useState([]);
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [finalDoctors, setFinalDoctors] = useState([]);
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
            const newData = filteredDoctors.filter((item) => {
                const itemData = item.lastName.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
            setFinalDoctors(newData);
        } else {
            setFinalDoctors(filteredDoctors);
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
        let newDoctors = doctors;
        if (Object.keys(filters).length) {
            if (Object.values(filters.districts).find(el => el)) {
                const trueDistricts = (Object.keys(filters.districts)
                    .filter(district => filters.districts[district]));
                newDoctors = newDoctors.filter(el => Object.keys(el.districts)
                    .filter(district => el.districts[district])
                    .some(district => trueDistricts.includes(district)));
            }
            if (filters.specialization) {
                newDoctors = newDoctors.filter(el => el.specialization === filters.specialization);
            }
            newDoctors = newDoctors.sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
        }
        setFilteredDoctors(newDoctors);
        setFinalDoctors(newDoctors);
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
                        onPress={() => navigation.navigate('DoctorCreate')}
                        title='add'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation, searchBarOpened, searchQuery]);

    function getDoctors() {
        console.log('doctors fetched');
        setIsLoading(true);
        setRefreshing(true);
        drfProvider('GET', 'doctors')
            .then((result) => {
                const mappedResult = Object.keys(result).map(doctorId => ({
                    id: doctorId,
                    ...result[doctorId],
                })).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
                setDoctors(mappedResult);
                setFilteredDoctors(mappedResult);
                setFinalDoctors(mappedResult);
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
        navigation.addListener('focus', getDoctors);
        return () => {
            navigation.removeListener('focus', getDoctors);
        };
    }, [navigation]);

    function renderItem({ item }) {
        function navigateTo() {
            navigation.navigate('Doctor', {
                doctor: item,
            });
        }

        return (
            <AppTouchable onPress={navigateTo}>
                <DoctorItemView>
                    <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10 }}>
                            {`Спеціалізація: ${item.specialization}`}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {`Послуги: ${Object.keys(item.services).filter(service => item.services[service]).join(', ')}`}
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
                    {
                        item.districts &&
                        Object.keys(item.districts).length > 0 &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 130 }}>
                                <Text>
                                    Райони:
                                </Text>
                            </View>
                            <Text>
                                {
                                    Object.keys(item.districts)
                                        .filter(district => item.districts[district]).join(', ')
                                }
                            </Text>
                        </View>
                    }
                </DoctorItemView>
            </AppTouchable>
        );
    }

    if (!finalDoctors.length && isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <View>
            <FiltersModal
                filtersToggler={filtersToggler}
                isVisible={filtersOpened}
                title={translate('doctors.filterDoctors')}
            >
                <DoctorsFilters
                    filters={filters}
                    filtersHandler={filtersHandler}
                />
            </FiltersModal>
            {
                !finalDoctors.length ?
                    <NoResults /> :
                    <FlatList
                        data={finalDoctors}
                        onRefresh={getDoctors}
                        refreshing={refreshing}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}

DoctorsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};