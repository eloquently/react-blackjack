// app/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { fromJS } from 'immutable';

import { newDeck, deal } from './lib/cards.js';

require('./css/main.scss');

let deck = newDeck();
let playerHand, dealerHand;

[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 2);

const state = fromJS({
    deck,
    playerHand,
    dealerHand,
    "winCount": 0,
    "lossCount": 0,
    hasStood: false
});

console.log(state);

ReactDOM.render(
    <App state={state} />,
    document.getElementById('app')
);