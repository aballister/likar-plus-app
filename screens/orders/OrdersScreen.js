import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    ScrollView,
    Platform, TouchableNativeFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {
    HeaderButtons, HiddenItem, Item, OverflowMenu,
} from 'react-navigation-header-buttons';
import { SearchBar } from 'react-native-elements';
import { Header, useHeaderHeight } from '@react-navigation/stack';
import { format } from 'date-fns';
import drfProvider from '../../providers/restProvider';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import theme from '../../theme/theme';
import OrdersFilters from '../../components/orders/OrdersFilters';
import Icon from '../../components/Icon';
import { OrderItemView } from './Orders.style';
import AppTouchable from '../../components/AppTouchable';
import { translate } from '../../locale';
import TouchableIcon from '../../components/TouchableIcon';

export default function OrdersScreen({ navigation }) {
    const [orders, setOrders] = useState([]);
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [finalOrders, setFinalOrders] = useState([]);
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
        let newOrders = orders;
        if (Object.keys(filters).length) {
            if (filters.ordersDateStart && filters.ordersDateEnd) {
                newOrders = orders
                    .filter(el => new Date(el.orderDate).setHours(0, 0, 0, 0) >= new Date(filters.ordersDateStart).setHours(0, 0, 0, 0) && new Date(el.orderDate).setHours(0, 0, 0, 0) <= new Date(filters.ordersDateEnd).setHours(0, 0, 0, 0));
            }
            if (Object.values(filters.customer).find(el => el)) {
                newOrders = newOrders.filter(el => filters.customer[el.customer]);
            }
            newOrders = newOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        }
        setFilteredOrders(newOrders);
        setFinalOrders(newOrders);
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
                    <OverflowMenu OverflowIcon={<Icon name='add' />}>
                        <HiddenItem
                            onPress={() => navigation.navigate('OrderCreate', { orderType: 'in-house' })}
                            title={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        color={theme.colors.black}
                                        name='home'
                                        size={18}
                                    />
                                    <Text style={{ marginLeft: 7 }}>Виклик на дім</Text>
                                </View>
                            }
                        />
                        <HiddenItem
                            onPress={() => navigation.navigate('OrderCreate', { orderType: 'online' })}
                            title={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        color={theme.colors.black}
                                        name='call'
                                        size={18}
                                    />
                                    <Text style={{ marginLeft: 7 }}>Телемедицина</Text>
                                </View>
                            }
                        />
                        <HiddenItem
                            onPress={() => navigation.navigate('OrderCreate', { orderType: 'clinic' })}
                            title={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        color={theme.colors.black}
                                        name='medical-services'
                                        size={18}
                                    />
                                    <Text style={{ marginLeft: 7 }}>Запис в клініку</Text>
                                </View>
                            }
                        />
                    </OverflowMenu>
                </HeaderButtons>
            ),
        });
    }, [navigation, filters, searchBarOpened, searchQuery]);

    function getOrders() {
        console.log('orders fetched');
        setIsLoading(true);
        setRefreshing(true);
        drfProvider('GET', 'orders')
            .then((result) => {
                const mappedResult = Object.keys(result).map(orderId => ({
                    id: orderId,
                    ...result[orderId],
                })).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(mappedResult);
                setFilteredOrders(mappedResult);
                setFinalOrders(mappedResult);
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
            const newData = filteredOrders.filter((item) => {
                const itemData = item.lastName.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            setFinalOrders(newData);
        } else {
            setFinalOrders(filteredOrders);
        }
        setSearchQuery(text);
        setQueryIsProcessing(false);
    }

    useEffect(() => {
        navigation.addListener('focus', getOrders);
        return () => {
            navigation.removeListener('focus', getOrders);
        };
    }, [navigation]);

    function renderItem({ item }) {
        function navigateTo() {
            navigation.navigate('Order', {
                order: item,
            });
        }

        return (
            <AppTouchable onPress={navigateTo}>
                <OrderItemView>
                    <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10 }}>
                            {`Статус: ${item.orderStatus}`}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {format(new Date(item.orderDate), 'dd.MM.yyyy')}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 18 }}>
                        {`${item.lastName} ${item.firstName} ${item.middleName}`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Дата народження:
                            </Text>
                        </View>
                        <Text>
                            {format(new Date(item.birthday), 'dd.MM.yyyy')}
                        </Text>
                    </View>
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
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Замовник:
                            </Text>
                        </View>
                        <Text>
                            {item.customer}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Поліс:
                            </Text>
                        </View>
                        <Text>
                            {item.insurance}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Адреса:
                            </Text>
                        </View>
                        <Text style={{ flex: 1 }}>
                            {`${item.city}, ${translate(item.streetType)}. ${item.street}, буд. ${item.house}, під’їзд ${item.entrance}, поверх ${item.floor}, кв. ${item.flat}`}
                        </Text>
                    </View>
                </OrderItemView>
            </AppTouchable>
        );
    }

    if (!finalOrders.length && isLoading) {
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
                            <Text>Фільтрувати замовлення</Text>
                        </View>
                        <OrdersFilters
                            filters={filters}
                            filtersHandler={filtersHandler}
                        />
                    </ScrollView>
                </View>
            </Modal>
            {
                !finalOrders.length ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Нічого не знайдено</Text>
                    </View> :
                    <FlatList
                        data={finalOrders}
                        onRefresh={getOrders}
                        refreshing={refreshing}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}

OrdersScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};