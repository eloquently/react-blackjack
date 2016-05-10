// app/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

import { new_deck } from './lib/cards.js';
import { fromJS } from 'immutable';

const deck = fromJS(new_deck());
console.log(deck);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);