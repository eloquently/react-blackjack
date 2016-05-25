import { Map } from 'immutable';

import { newDeck, deal, score } from './lib/cards';

const setupGame = (currentState, seed) => {
    let deck = newDeck(seed);
    let playerHand, dealerHand;
    
    [deck, playerHand] = deal(deck, 2, seed);
    [deck, dealerHand] = deal(deck, 1, seed + 1);
    
    dealerHand = dealerHand.push(new Map());
    
    const hasStood = false;
    
    let gameOver = false;
    let playerWon = undefined;
    let winCount = currentState.get('winCount') || 0;
    
    if(score(playerHand) == 21) {
        gameOver = true;
        playerWon = true;
        winCount += 1;
    }
    
    const newState = new Map({ 
        deck, playerHand, 
        dealerHand, hasStood,
        gameOver, playerWon,
        winCount
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
    }
    
    return currentState.merge(newState);
};

const dealToDealer = (currentState, seed) => {
    let dealerHand = currentState.get('dealerHand');
    let deck = currentState.get('deck');
    
    let newCards;
    [deck, newCards] = deal(deck, 1, seed);
    dealerHand = dealerHand.push(newCards.get(0));
    
    return currentState.merge({ deck, dealerHand });
};

const determineWinner = (currentState) => {
    let winCount = currentState.get('winCount');
    let lossCount = currentState.get('lossCount');
    const playerHand = currentState.get('playerHand');
    const dealerHand = currentState.get('dealerHand');
    const gameOver = true;
    
    const playerScore = score(playerHand);
    let playerWon = undefined;
    const dealerScore = score(dealerHand);
    
    if(playerScore > dealerScore || dealerScore > 21) {
        winCount += 1;
        playerWon = true;
    } else if(dealerScore > playerScore) {
        lossCount += 1;
        playerWon = false;
    }
    
    return currentState.merge({ winCount, lossCount, gameOver, playerWon});
};


const stand = (currentState, seed) => {
    let hasStood = true;
    let dealerHand = currentState.get('dealerHand');
    
    dealerHand = dealerHand.filter((element) => element != new Map());
    
    return currentState.merge({hasStood, dealerHand});
};

export default function(currentState=new Map(), action) {
    switch(action.type) {
        case 'SETUP_GAME':
            return setupGame(currentState, action.seed);
        case 'SET_RECORD':
            return setRecord(currentState, action.wins, action.losses);
        case 'DEAL_TO_PLAYER':
            return dealToPlayer(currentState, action.seed);
        case 'DEAL_TO_DEALER':
            return dealToDealer(currentState, action.seed);
        case 'DETERMINE_WINNER':
            return determineWinner(currentState);
        case 'STAND':
            return stand(currentState, action.seed);
    }
    return currentState;
}