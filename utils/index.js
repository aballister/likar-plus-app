import { Alert } from 'react-native';

export function dateComparison(a, b) {
    if (a instanceof Date) {
        return a.setHours(0, 0, 0, 0) === b.setHours(0, 0, 0, 0);
    }
    return undefined;
}

export function requestErrorHandler(error) {
    Alert.alert(
        'Some shit happened',
        `${error.status}`,
        [
            {
                text: 'OK',
            },
        ],
    );
}

export default dateComparison;