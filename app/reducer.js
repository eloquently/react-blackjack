// app/reducer.js

import { Map } from 'immutable';

import { newDeck, deal } from './lib/cards.js';

const setupGame = (currentState) => {
    let deck = newDeck();
    let playerHand, dealerHand;
    
    [deck, playerHand] = deal(deck, 2);
    [deck, dealerHand] = deal(deck, 1);
    
    dealerHand = dealerHand.push(new Map());
    
    const hasStood = false;
    
    const newState = new Map({ deck, playerHand, dealerHand, hasStood });
  
    return currentState.merge(newState);
};

const setRecord = (currentState, wins, losses) => {
    return currentState.merge(new Map({ "winCount": wins, "lossCount": losses }));
};

export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'SETUP_GAME':
            return setupGame(currentState);
        case 'SET_RECORD':
            return setRecord(currentState, action.wins, action.losses);
    }
    return currentState;
}