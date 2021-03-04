import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useFetchOnFocus(fetchHandler) {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.addListener('focus', fetchHandler);
        return () => {
            navigation.removeListener('focus', fetchHandler);
        };
    }, [navigation]);
}