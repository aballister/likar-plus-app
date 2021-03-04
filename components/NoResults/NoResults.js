import React from 'react';
import { Text } from 'react-native';
import { translate } from '../../locale';
import NoResultsView from './NoResults.style';

export default function NoResults() {
    return (
        <NoResultsView>
            <Text>
                {translate('nothingFound')}
            </Text>
        </NoResultsView>
    );
}