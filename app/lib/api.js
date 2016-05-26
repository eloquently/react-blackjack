import fetch from 'isomorphic-fetch';
import url from 'url';

function makeUrl(token) {
    const pathname = token ? `users/${token}` : 'users';
    return url.format({
        hostname: process.env.API_HOST,
        port: process.env.API_PORT,
        pathname
    });
}

function headers() {
    return { 
        'Authorization': `Token token=${process.env.API_TOKEN}`,
        'Content-Type': 'application/json'
    };
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function fetchUser(token) {
    return fetch(makeUrl(token), {
        method: 'GET',
        headers: headers()
    })
    .then(checkStatus)
    .then(response => response.json() );
}

export function patchUser(token, body) {
    body = JSON.stringify(body);
    return fetch(makeUrl(token), {
        method: 'PATCH',
        headers: headers(),
        body
    }).then(response => response.json() );
}

export function createUser(body) {
    return fetch(makeUrl(), {
        method: 'POST',
        headers: headers(),
        body
    }).then(response => response.json() );
}