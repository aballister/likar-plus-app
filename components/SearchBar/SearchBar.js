import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { SearchBar as NativeSearchBar } from 'react-native-elements';
import TouchableIcon from '../TouchableIcon/TouchableIcon';
import { SearchBarView } from './SearchBar.style';
import theme from '../../theme/theme';

export default function SearchBar(props) {
    const {
        searchQuery, queryIsProcessing, searchQueryHandler, searchBarToggler, headerTop,
        placeholder, headerHeight,
    } = props;

    const Icon = (
        <TouchableIcon
            name='arrow-back'
            onPress={searchBarToggler}
        />
    );

    return (
        <SearchBarView
            headerHeight={headerHeight}
            headerTop={headerTop}
        >
            <NativeSearchBar
                autoFocus
                cancelIcon={Icon}
                containerStyle={{
                    color: theme.colors.white, height: '100%', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, borderRadius: 3, overflow: 'hidden', paddingHorizontal: 0,
                }}
                loadingProps={{ color: 'rgba(0, 0, 0, 0.54)' }}
                onChangeText={searchQueryHandler}
                placeholder={placeholder}
                platform={Platform.OS}
                returnKeyType='search'
                searchIcon={Icon}
                showLoading={queryIsProcessing}
                value={searchQuery}
            />
        </SearchBarView>
    );
}

SearchBar.propTypes = {
    searchBarToggler: PropTypes.func.isRequired,
    searchQueryHandler: PropTypes.func.isRequired,
    headerHeight: PropTypes.number,
    headerTop: PropTypes.number,
    placeholder: PropTypes.string,
    queryIsProcessing: PropTypes.bool,
    searchQuery: PropTypes.string,
};

SearchBar.defaultProps = {
    headerHeight: 0,
    headerTop: 0,
    placeholder: '',
    queryIsProcessing: false,
    searchQuery: '',
};