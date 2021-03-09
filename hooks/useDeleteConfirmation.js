import { Alert } from 'react-native';
import { translate } from '../locale';

export default function useDeleteConfirmation(title, message, removeHandler) {
    function deleteHandler() {
        Alert.alert(
            title,
            message,
            [
                {
                    text: translate('form.cancel'),
                    style: 'cancel',
                },
                { text: translate('form.delete'), onPress: removeHandler },
            ],
            { cancelable: false },
        );
    }

    return deleteHandler;
}