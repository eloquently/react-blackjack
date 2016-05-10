// app/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

const ranks = ['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
const suits = ['S', 'C', 'H', 'D']

const deck = []

ranks.forEach( (r) => {
    suits.forEach( (s) => {
        deck.push({ "rank": r, "suit": s});
    });
});

const shuffle = (a) => {
    let j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

shuffle(deck);

console.log(deck);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);