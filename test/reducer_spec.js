// test/reducer_spec.js

import { Map } from 'immutable';
import { expect } from 'chai';

import reducer from '../app/reducer';

describe('reducer', () => {
    describe("SETUP_GAME", () => {
        const action = {
            type: 'SETUP_GAME'
        };
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
        });
        
        describe("with existing initial state", () => {
            const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
            const nextState = reducer(initialState, action);
            
            it('adds new variables', () => {
                expect(Array.from(nextState.keys())).to.include('deck', 'playerHand', 'dealerHand');
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
});