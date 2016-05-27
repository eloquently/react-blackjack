import { expect } from 'chai';
import watchActions from '../../app/sagas/index';

describe('sagas', () => {
    describe('watchActions()', () => {
        it('counts up', () => {
            const generator = watchActions();
            let i;
            i = generator.next().value;
            expect(i).to.eq('start');
            i = generator.next().value;
            expect(i).to.eq(0);
            i = generator.next().value;
            expect(i).to.eq('end loop');
            i = generator.next().value;
            expect(i).to.eq(1);
        });
    });
});