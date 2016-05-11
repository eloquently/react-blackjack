// app/lib/cards.js

import { fromJS, List } from 'immutable';

export const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const newDeck = () => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'C', 'H', 'D'];
    
    const deck = [];
    
    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });
    
    shuffle(deck);
    
    return fromJS(deck);
};

// deal n cards from random position in deck
export const deal = (deck, n) => {
    if(n == 1) {
        const r = Math.floor(Math.random() * deck.size);
        let dealtCards = new List([deck.get(r)]);
        let newDeck = deck.remove(r);
        return [newDeck, dealtCards]
    }
    
    let dealtCards = new List();
    let newDeck = deck;
    for(let i = 0; i < n; i += 1) {
        let [d, c] = deal(newDeck, 1);
        dealtCards = dealtCards.push(c.first());
        newDeck = d;
    }
    return [newDeck, dealtCards];
};