// app/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { fromJS, Map } from 'immutable';

import { newDeck, deal } from './lib/cards.js';

require('./css/main.scss');

let deck = newDeck();
let playerHand, dealerHand;

[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 1);

dealerHand = dealerHand.push(new Map());

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