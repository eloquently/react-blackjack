import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';
import { setupGame, setRecord, dealToPlayer, stand } from '../app/action_creators';
import { newDeck } from '../app/lib/cards.js';

import reducer from '../app/reducer';

describe('reducer', () => {
    describe("SETUP_GAME", () => {
        const action = setupGame();
        
        describe("with empty initial state", () => {
            const initialState = undefined;
            const nextState = reducer(initialState, action);
            
            it('sets up deck', () => {
                expect(nextState.get('deck').size).to.eq(49);
            });
            
            it('sets up playerHand', () => {
                expect(nextState.get('playerHand').size).to.eq(2);
            });
            
            it('sets up dealerHand', () => {
                expect(nextState.get('dealerHand').size).to.eq(2);
                expect(nextState.get('dealerHand').last()).to.eq(new Map());
            });
            
            it('sets up hasStood', () => {
                expect(nextState.get('hasStood')).to.eq(false);
            });
            
            it('sets up gameOver', () => {
                expect(nextState.get('gameOver')).to.eq(false);
            });
            
            it('sets up playerWon', () => {
                expect(nextState.get('playerWon')).to.eq(undefined);
            });
        });
        
        describe("with existing initial state", () => {
            const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
            const nextState = reducer(initialState, action);
            
            it('adds new variables', () => {
                expect(Array.from(nextState.keys())).to.include(
                    'deck', 'playerHand', 'dealerHand', 
                    'hasStood', 'gameOver', 'playerWon'
                );
            });
            
            it('keeps old variables', () => {
                expect(nextState.get('winCount')).to.eq(10);
                expect(nextState.get('lossCount')).to.eq(7);
            });
            
            it('overwrites old variables', () => {
                expect(nextState.get('deck')).not.to.eq('fake deck');
            });
        });
    });
     
    describe("SET_RECORD", () => {
        const action = setRecord(3, 2);
        
        const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
        const nextState = reducer(initialState, action);
        
        it('sets winCount and lossCount = 0', () => {
            expect(nextState.get('winCount')).to.eq(3);
            expect(nextState.get('lossCount')).to.eq(2);
        });
        
        it('keeps old variables', () => {
            expect(nextState.get('deck')).to.eq('fake deck');
        });
    });
    
    describe("DEAL_TO_PLAYER", () => {
        const action = dealToPlayer();
        
        const initialState = new Map({"playerHand": new List(), "deck": newDeck()});
        const nextState = reducer(initialState, action);
        
        it('adds one card to player hand', () => {
            expect(nextState.get('playerHand').size).to.eq(initialState.get('playerHand').size + 1);
        });
        
        it('removes one card from deck', () => {
            expect(nextState.get('deck').size).to.eq(initialState.get('deck').size - 1);
        });
        
        
        describe("when player gets more than 21 points", () => {
            const initialState = fromJS({
                "playerHand": [{rank: 'K'}, {rank: 'Q'}],
                "deck": fromJS([{rank: 'J'}]),
                "lossCount": 0
            });
            const nextState = reducer(initialState, action);
            
            it('increases loss count by 1', () => {
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount') + 1);
            });
            
            it('toggles gameOver and sets playerWon', () => {
                expect(nextState.get('gameOver')).to.eq(true);
                expect(nextState.get('playerWon')).to.eq(false);
            });
        });
        
        describe("when player gets exactly 21 points", () => {
            const initialState = fromJS({
                "playerHand": [{rank: 'K'}, {rank: 2}],
                "deck": fromJS([{rank: 9}]),
                "winCount": 0
            });
            const nextState = reducer(initialState, action);
            
            it('increases win count by 1', () => {
                expect(nextState.get('winCount')).to.eq(initialState.get('winCount') + 1);
            });
            
            it('toggles gameOver and sets playerWon', () => {
                expect(nextState.get('gameOver')).to.eq(true);
                expect(nextState.get('playerWon')).to.eq(true);
            });
        });
    });
    
    describe("STAND", () => {
        const action = stand();
        const initialState = new Map({"hasStood": false});
        const nextState = reducer(initialState, action);
        
        it('sets hasStood to true', () => {
            expect(nextState.get('hasStood')).to.eq(true);
        });
    });
});