// app/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { fromJS } from 'immutable';

import { newDeck, deal } from './lib/cards.js';

let deck = newDeck();
let player_hand, dealer_hand;

[deck, player_hand] = deal(deck, 2);
[deck, dealer_hand] = deal(deck, 2);

const state = fromJS({
    deck,
    player_hand,
    dealer_hand,
    "win_count": 0,
    "loss_count": 0,
    hasStood: false
});

console.log(state);

ReactDOM.render(
    <App state={state} />,
    document.getElementById('app')
);