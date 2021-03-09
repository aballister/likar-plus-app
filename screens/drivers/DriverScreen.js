import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import drfProvider from '../../providers/restProvider';
import { requestErrorHandler } from '../../utils';
import ListItem from '../../components/ListItem/ListItem';
import useHeaderItemButtons from '../../hooks/useHeaderItemButtons';
import useDeleteConfirmation from '../../hooks/useDeleteConfirmation';
import { translate } from '../../locale';
import useSettings from '../../hooks/useSettings';

export default function DriverScreen({ route, navigation }) {
    const { item } = route.params;
    const settings = useSettings();

    function removeItemHandler() {
        drfProvider('DELETE', `${settings.resource}/${item.id}`)
            .then(() => {
                navigation.navigate(settings.list.screen);
            })
            .catch(requestErrorHandler);
    }

    const removeHandler = useDeleteConfirmation(translate(`${settings.resource}.removeItem`), translate(`${settings.resource}.removeItemConfirm`), removeItemHandler);

    useHeaderItemButtons(item, settings.edit.screen, removeHandler);

    return (
        <View style={{ flex: 1 }}>
            <ListItem
                fields={settings.page.fields}
                item={item}
                routeTo={settings.itemScreen}
                title={settings.page.titleFields}
            />
        </View>
    );
}

DriverScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};