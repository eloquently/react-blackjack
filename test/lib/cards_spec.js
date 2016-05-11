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
        
        it('does not deal same card each time', () => {
            const cards = [];
            for(let i = 0; i < 10; i += 1) {
                cards.push(deal(deck, 1)[1].first()); 
            }
            const all_same = cards.reduce( (prev, curr) => prev && (cards[0] === curr), true );
            expect(all_same).to.eq(false);
        });
    });
});