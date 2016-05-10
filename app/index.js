// app/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

import { newDeck, deal } from './lib/cards.js';
import { fromJS } from 'immutable';

let deck = fromJS(newDeck());
console.log("start deck:");
console.log(deck);

let player_hand, dealer_hand;

[deck, player_hand] = deal(deck, 2);
[deck, dealer_hand] = deal(deck, 2);

console.log("end deck:");
console.log(deck);
console.log("player_hand:");
console.log(player_hand);
console.log("dealer_hand:");
console.log(dealer_hand);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);