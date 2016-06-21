import { expect } from 'chai';
import watchActions from '../../app/sagas/index';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const actionType = (next) => {
    return next.value.PUT.action.type;
};

const selectorName = (next) => {
    return next.value.SELECT.selector.name;
};

const callFnName = (next) => {
    return next.value.CALL.fn.name;
};

describe('sagas', () => {
    describe('watchActions()', () => {
        const generator = watchActions();
        const next = generator.next();
        
        it('watches stand, fetch record, and setup game', () => {
            expect(next.value[0].name).to
                .eq('takeLatest(STAND, onStand)');
                
            expect(next.value[1].name).to
                .eq('takeLatest(FETCH_RECORD, onFetchRecord)');
                
            expect(next.value[2].name).to
                .eq('takeLatest(SETUP_GAME, onPatchRecord)');
        });
    });
    
    describe('onStand()', () => {
        const cardUtils = {};
        const stubbedSagas = proxyquire(
            '../../app/sagas/index',
            { '../lib/cards' : cardUtils }
        );
        
        let generator;
        
        beforeEach( () => {
            cardUtils.score = sinon.stub();
            generator = stubbedSagas.onStand();
        });
        
        context('when dealer does not draw' , () => {
            it('yields correct effects', () => {
                cardUtils.score.returns(21);
                
                expect(selectorName(generator.next())).to
                    .eq('getSpeed');
                    
                expect(actionType(generator.next())).to
                    .eq('DEAL_TO_DEALER');
                
                expect(selectorName(generator.next())).to
                    .eq('getDealerHand');
                    
                expect(actionType(generator.next())).to
                    .eq('DETERMINE_WINNER');
                
                expect(generator.next().done).to
                    .eq(true);
            });
        });
        
        context('when dealer draws' , () => {
            it('yields correct effects', () => {
                cardUtils.score.onCall(0).returns(10);
                cardUtils.score.onCall(1).returns(21);
                
                expect(selectorName(generator.next())).to
                    .eq('getSpeed');

                expect(actionType(generator.next())).to
                    .eq('DEAL_TO_DEALER');

                expect(selectorName(generator.next())).to
                    .eq('getDealerHand');

                expect(callFnName(generator.next())).to
                    .eq('delay');

                expect(actionType(generator.next())).to
                    .eq('DEAL_TO_DEALER');

                expect(selectorName(generator.next())).to
                    .eq('getDealerHand');
                    
                expect(actionType(generator.next())).to
                    .eq('DETERMINE_WINNER');

                expect(generator.next().done).to
                    .eq(true);
            });
        });
    });
});