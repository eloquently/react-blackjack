import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { Map, List } from 'immutable';
import { delay } from 'redux-saga';

const getState = () => ({game: new Map({ dealerHand: new List() }) });

describe('sagas', () => {
    describe('dealToDealerUntilDone', () => {
        const cardUtils = {};
        const dealToDealerUntilDone = proxyquire('../app/sagas', 
            {'./lib/cards': cardUtils}).dealToDealerUntilDone;
        
        let generator;
        beforeEach( () => {
            cardUtils.score = sinon.stub();
            generator = dealToDealerUntilDone(getState);
        });
        
        describe('when dealer does not draw', () => {
            it('immediately puts DETERMINE_WINNER', () => {
                cardUtils.score.returns(21);
                expect(generator.next().value.PUT.action.type).to.eq('DETERMINE_WINNER');
            });
        });
        
        describe('when dealer draws once', () => {
            it('deals then determines winner', () => {
                cardUtils.score.onCall(0).returns(10);
                cardUtils.score.onCall(1).returns(21);
                expect(generator.next().value.PUT.action.type).to.eq('DEAL_TO_DEALER');
                expect(generator.next().value.PUT.action.type).to.eq('DETERMINE_WINNER');
                expect(generator.next().done).to.eq(true);
            });
        });
        
        describe('when dealer draws more than once', () => {
            it('deals then waits then deals then determines winner', () => {
                cardUtils.score.onCall(0).returns(10);
                cardUtils.score.onCall(1).returns(12);
                cardUtils.score.onCall(2).returns(21);
                expect(generator.next().value.PUT.action.type).to.eq('DEAL_TO_DEALER');
                expect(generator.next().value.CALL.fn).to.eq(delay);
                expect(generator.next().value.PUT.action.type).to.eq('DEAL_TO_DEALER');
                expect(generator.next().value.PUT.action.type).to.eq('DETERMINE_WINNER');
            });
        });
    });
});