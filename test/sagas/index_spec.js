import { expect } from 'chai';
import watchActions from '../../app/sagas/index';

describe('sagas', () => {
    describe('watchActions()', () => {
        const generator = watchActions();
        const next = generator.next();
        
        it('yields takeLatest', () => {
            expect(next.value.name).to
                .eq('takeLatest(STAND, onStand)');
        });
    });
});