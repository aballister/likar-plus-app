import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native';
import {
    FiltersModalContainer,
    FiltersModalInnerView,
    FiltersModalView,
} from './FiltersModal.style';

export default function FiltersModal(props) {
    const {
        isVisible, filtersToggler, title, children,
    } = props;
    return (
        <FiltersModalContainer
            animationIn='slideInRight'
            animationOut='slideOutRight'
            isVisible={isVisible}
            onBackdropPress={filtersToggler}
            onSwipeComplete={filtersToggler}
            swipeDirection='right'
        >
            <FiltersModalView>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <FiltersModalInnerView>
                        <Text>
                            {title}
                        </Text>
                    </FiltersModalInnerView>
                    {children}
                </ScrollView>
            </FiltersModalView>
        </FiltersModalContainer>
    );
}

FiltersModal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    filtersToggler: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
};

FiltersModal.defaultProps = {
    isVisible: false,
};