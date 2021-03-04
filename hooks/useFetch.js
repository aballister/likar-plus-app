import { useState } from 'react';
import drfProvider from '../providers/restProvider';
import { requestErrorHandler } from '../utils';

export default function useFetch(url, sortFn) {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);

    function fetchApi() {
        console.log(`${url} fetched`);
        setIsLoading(true);
        drfProvider('GET', url)
            .then((response) => {
                const mappedResult = Object.keys(response).map(id => ({
                    id,
                    ...response[id],
                }));
                if (sortFn) {
                    mappedResult.sort(sortFn);
                }
                setResult(mappedResult);
                setIsLoading(false);
            })
            .catch(requestErrorHandler);
    }

    return [result, fetchApi, isLoading];
}