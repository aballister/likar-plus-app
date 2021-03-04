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
import { CompanyItemView } from './Companies.style';
import { translate } from '../../locale';
import NoResults from '../../components/NoResults/NoResults';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default function CompaniesScreen({ navigation }) {
    const [companies, setCompanies] = useState([]);
    const [queryIsProcessing, setQueryIsProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [finalCompanies, setFinalCompanies] = useState([]);
    const [searchBarOpened, setSearchBarOpened] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function searchQueryHandler(text) {
        setQueryIsProcessing(true);
        if (text?.length > 1) {
            const newData = companies.filter((item) => {
                const itemData = item.name.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }).sort((a, b) => new Date(b.name) - new Date(a.name));
            setFinalCompanies(newData);
        } else {
            setFinalCompanies(companies);
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

    const headerHeight = useHeaderHeight();
    useLayoutEffect(() => {
        navigation.setOptions({
            header: headerProps => (searchBarOpened ?
                <SearchBar
                    headerHeight={headerHeight}
                    headerTop={headerProps.insets.top}
                    placeholder={translate('form.searchByName')}
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
                        iconName='add'
                        onPress={() => navigation.navigate('CompanyCreate')}
                        title='add'
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation, searchBarOpened, searchQuery]);

    function getCompanies() {
        console.log('companies fetched');
        setIsLoading(true);
        setRefreshing(true);
        drfProvider('GET', 'companies')
            .then((result) => {
                const mappedResult = Object.keys(result).map(companyId => ({
                    id: companyId,
                    ...result[companyId],
                })).sort((a, b) => new Date(b.lastName) - new Date(a.lastName));
                setCompanies(mappedResult);
                setFinalCompanies(mappedResult);
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
        navigation.addListener('focus', getCompanies);
        return () => {
            navigation.removeListener('focus', getCompanies);
        };
    }, [navigation]);

    function renderItem({ item }) {
        function navigateTo() {
            navigation.navigate('Company', {
                company: item,
            });
        }

        return (
            <AppTouchable onPress={navigateTo}>
                <CompanyItemView>
                    <View style={{ fontSize: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10 }}>
                            {`Договір: ${item.contract}`}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 18 }}>
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Гаряча лінія:
                            </Text>
                        </View>
                        <Text>
                            {item.phone}
                        </Text>
                    </View>
                    <Text>Контактна особа:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                {item.position}
                            </Text>
                        </View>
                        <Text>
                            {`${item.lastName} ${item.firstName} ${item.middleName}`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 130 }}>
                            <Text>
                                Телефон:
                            </Text>
                        </View>
                        <Text>
                            {item.managerPhone}
                        </Text>
                    </View>
                </CompanyItemView>
            </AppTouchable>
        );
    }

    if (!finalCompanies.length && isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <View>
            {
                !finalCompanies.length ?
                    <NoResults /> :
                    <FlatList
                        data={finalCompanies}
                        onRefresh={getCompanies}
                        refreshing={refreshing}
                        renderItem={renderItem}
                    />
            }
        </View>
    );
}

CompaniesScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};