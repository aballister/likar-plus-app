import { apiUrl } from '../settings';

export function drfProvider(type, url, body, token) {
    const options = {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Language': '*',
            Authorization: `Token ${token}`,
        },
    };

    if (type === 'POST' || type === 'PUT' || type === 'PATCH') {
        options.body = JSON.stringify(body);
    }

    return fetch(`${apiUrl}${url}.json`, options)
        .then((response) => {
            if (!response.ok) {
                throw response;
            }
            return type !== 'DELETE' ? response.json() : response;
        });
}

export default drfProvider;