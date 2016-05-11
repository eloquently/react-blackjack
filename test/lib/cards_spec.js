// test/lib/cards_spec.js

import { expect } from 'chai';
import { List } from 'immutable';

import { newDeck, deal } from '../../app/lib/cards';

describe('cards.js', () => {
    describe('newDeck', () => {
        it('returns an immutable list', () => {
            expect(newDeck()).to.be.instanceOf(List);
        });
        
        it('has 52 elements', () => {
            expect(newDeck().size).to.eq(52);
        });
    });
    describe('deal', () => {
        const deck = newDeck();
        const n = 5;
        const [new_deck, new_hand] = deal(deck, n);

        it('returns smaller deck', () => {
            expect(new_deck.size).to.eq(52 - n);
        });
        
        it('does not change cards in deck', () => {
            for(let i = 0; i < new_deck.get(i); i++) {
                expect(new_deck.get(i)).to.eq(deck.get(i));
            } 
        });

        it('returns hand of n cards', () => {
            expect(new_hand.size).to.eq(n);
        });
        
        it('puts correct cards in hand', () => {
            for(let i = n-1; i >= 0; i--) {
                expect(new_hand.get(i)).to.eq(deck.get(51-(n-1)+i));
            }
        });
    });
});