import { apiUrl } from '../settings';

export function drfProvider(method, url, data, token) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': '*',
            Authorization: `Token ${token}`,
        },
    };

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        options.body = JSON.stringify(data);
    }

    return fetch(`${apiUrl}${url}.json`, options)
        .then((response) => {
            if (!response.ok) {
                throw response;
            }
            return method !== 'DELETE' ? response.json() : response;
        });
}

export default drfProvider;