import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    Platform, TouchableNativeFeedback, ScrollView,
} from 'react-native';
import {
    HeaderButtons, Item,
} from 'react-navigation-header-buttons';
import { SearchBar } from 'react-native-elements';
import { Header, useHeaderHeight } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import theme from '../../theme/theme';
import { DriverItemView } from './Drivers.style';
import AppTouchable from '../../components/AppTouchable';
import TouchableIcon from '../../components/TouchableIcon';
import DriversFilters from '../../components/drivers/DriversFilters';

export default function DriversScreen({ navigation }) {
    const [drivers, setDrivers] = useState([]);
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [finalDrivers, setFinalDrivers] = useState([]);
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

    function searchBarToggler() {
        if (searchBarOpened) {
            searchQueryHandler();
        }
        setSearchBarOpened(state => !state);
    }

    useEffect(() => {
        let newDrivers = drivers;
        if (Object.keys(filters).length) {
            if (Object.values(filters.districts).find(el => el)) {
                const trueDistricts = (Object.keys(filters.districts).filter(district => filters.districts[district]));
                newDrivers = newDrivers.filter(el => Object.keys(el.districts).filter(district => el.districts[district]).some(district => trueDistricts.includes(district)));
            }
            if (filters.specialization) {
                newDrivers = newDrivers.filter(el => el.specialization === filters.specialization);
            }
            newDrivers = newDrivers.sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
        }
        setFilteredDrivers(newDrivers);
        setFinalDrivers(newDrivers);
    }, [filters]);

    const headerHeight = useHeaderHeight();
    useLayoutEffect(() => {
        navigation.setOptions({
            header: headerProps => (searchBarOpened ?
                <View style={{
                    height: headerHeight,
                    paddingTop: headerProps.insets.top + 4,
                    paddingBottom: 5,
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 5,
                }}
                >
                    <SearchBar
                        autoFocus
                        cancelIcon={
                            <TouchableIcon
                                containerStyle={{
                                    marginLeft: -5,
                                    marginRight: -4,
                                }}
                                name='arrow-back'
                                onPress={searchBarToggler}
                                size={36}
                                touchableProps={{
                                    activeOpacity: 0.3,
                                    background: TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)'),
                                }}
                            />
                        }
                        containerStyle={{
                            color: '#fff', height: '100%', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, borderRadius: 3, overflow: 'hidden', paddingHorizontal: 0,
                        }}
                        loadingProps={{ color: 'rgba(0, 0, 0, 0.54)' }}
                        onChangeText={searchQueryHandler}
                        placeholder='Пошук за прізвищем'
                        platform={Platform.OS}
                        returnKeyType='search'
                        searchIcon={
                            <TouchableIcon
                                containerStyle={{
                                    marginLeft: -5,
                                    marginRight: -4,
                                }}
                                name='arrow-back'
                                onPress={searchBarToggler}
                                size={36}
                                touchableProps={{
                                    activeOpacity: 0.3,
                                    background: TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)'),
                                }}
                            />
                        }
                        showLoading={queryIsProcessing}
                        value={searchQuery}
                    />
                </View> :
                <Header {...headerProps} />),
            headerLeft: props => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName='menu'
                        onPress={() => navigation.toggleDrawer()}
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
                        onPress={() => navigation.navigate('DriverCreate')}
                        title='add'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation, searchBarOpened, searchQuery]);

    function getDrivers() {
        console.log('drivers fetched');
        setIsLoading(true);
        setRefreshing(true);
        drfProvider('GET', 'drivers')
            .then((result) => {
                const mappedResult = Object.keys(result).map(driverId => ({
                    id: driverId,
                    ...result[driverId],
                })).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
                setDrivers(mappedResult);
                setFilteredDrivers(mappedResult);
                setFinalDrivers(mappedResult);
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

    function searchQueryHandler(text) {
        setQueryIsProcessing(true);
        if (text?.length > 1) {
            const newData = filteredDrivers.filter((item) => {
                const itemData = item.lastName.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
            setFinalDrivers(newData);
        } else {
            setFinalDrivers(filteredDrivers);
        }
        setSearchQuery(text);
        setQueryIsProcessing(false);
    }

    useEffect(() => {
        navigation.addListener('focus', getDrivers);
        return () => {
            navigation.removeListener('focus', getDrivers);
        };
    }, [navigation]);

    function renderItem({ item }) {
        function navigateTo() {
            navigation.navigate('Driver', {
                driver: item,
            });
        }

        return (
            <AppTouchable onPress={navigateTo}>
                <DriverItemView>
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
                </DriverItemView>
            </AppTouchable>
        );
    }

    if (!finalDrivers.length && isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    color='#000000'
                    size='large'
                />
            </View>
        );
    }

    return (
        <View>
            <Modal
                animationIn='slideInRight'
                animationOut='slideOutRight'
                isVisible={filtersOpened}
                onBackdropPress={filtersToggler}
                onSwipeComplete={filtersToggler}
                style={{ margin: 0, alignItems: 'flex-end' }}
                swipeDirection='right'
            >
                <View style={{ flex: 1, width: 280, backgroundColor: 'white' }}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', padding: 10, position: 'relative',
                        }}
                        >
                            <Text>Фільтрувати водіїв</Text>
                        </View>
                        <DriversFilters
                            filters={filters}
                            filtersHandler={filtersHandler}
                        />
                    </ScrollView>
                </View>
            </Modal>
            {
                !finalDrivers.length ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Нічого не знайдено</Text>
                    </View> :
                    <FlatList
                        data={finalDrivers}
                        onRefresh={getDrivers}
                        refreshing={refreshing}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}

DriversScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};