import { expect } from 'chai';
import runSagas from '../../app/sagas/index';

describe('sagas', () => {
    describe('runSagas()', () => {
        it('counts up', () => {
            const generator = runSagas();
            let i;
            i = generator.next().value;
            expect(i).to.eq(0);
            i = generator.next().value;
            expect(i).to.eq(1);
            i = generator.next().value;
            expect(i).to.eq(2);
        });
    })
});