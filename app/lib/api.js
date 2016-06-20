import fetch from 'isomorphic-fetch';
import url from 'url';

function makeUrl(token) {
    const pathname = `users/${token}`;
    return url.format({
        hostname: "react-blackjack-etmckay1.c9users.io",
        port: 8081,
        pathname
    });
}

export function fetchUser(token) {
    console.log('this would fetch the user...');
    return new Promise((resolve) => resolve({ win_count: 0, loss_count: 0 }));
    // return fetch(makeUrl(token), {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => response.json());
}

export function patchUser(token, body) {
    console.log('this would save the user...');
    return new Promise((resolve) => resolve());
    // return fetch(makeUrl(token), {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // }).then(response => response.json());
}