import { Map } from 'immutable';

import { newDeck, deal, score } from './lib/cards.js';

const setupGame = (currentState, seed) => {
    let deck = newDeck(seed);
    let playerHand, dealerHand;
    
    [deck, playerHand] = deal(deck, 2, seed);
    [deck, dealerHand] = deal(deck, 1, seed + 1);
    
    dealerHand = dealerHand.push(new Map());
    
    const hasStood = false;
    
    const gameOver = false;
    const playerWon = undefined;
    
    const newState = new Map({ 
        deck, playerHand, 
        dealerHand, hasStood,
        gameOver, playerWon
    });
  
    return currentState.merge(newState);
};

const setRecord = (currentState, wins, losses) => {
    return currentState.merge(new Map({ "winCount": wins, "lossCount": losses }));
};

const dealToPlayer = (currentState, seed) => {
    const [deck, newCard] = deal(currentState.get('deck'), 1, seed);
    
    const playerHand = currentState.get('playerHand').push(newCard.get(0));
    
    let newState = new Map({ deck, playerHand });
    
    const newScore = score(playerHand);
    
    if(newScore > 21) {
        const lossCount = currentState.get('lossCount') + 1;
        const gameOver = true;
        const playerWon = false;
        newState = newState.merge({lossCount, gameOver, playerWon});
    } else if(newScore == 21) {
        const winCount = currentState.get('winCount') + 1;
        const gameOver = true;
        const playerWon = true;
        newState = newState.merge({winCount, gameOver, playerWon});
    }
    
    return currentState.merge(newState);
};

const stand = (currentState) => {
    return currentState.merge(new Map({"hasStood": true}));
};

export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'SETUP_GAME':
            return setupGame(currentState, action.seed);
        case 'SET_RECORD':
            return setRecord(currentState, action.wins, action.losses);
        case 'DEAL_TO_PLAYER':
            return dealToPlayer(currentState, action.seed);
        case 'STAND':
            return stand(currentState);
    }
    return currentState;
}