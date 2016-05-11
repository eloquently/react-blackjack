// test/components/info_spec.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Info from '../../app/components/info';

describe('<Info />', () => {
    describe('when hasStood is false', () => {
        const rendered = shallow(<Info winCount={1} lossCount={2} hasStood={false} />);
    
        it('displays record', () => {
            expect(rendered).to.include.text("Wins: 1");
            expect(rendered).to.include.text("Losses: 2");
        });
        
        const buttons = rendered.find('button');
        it('shows hit and stand buttons', () => {
            expect(buttons).to.have.length(2);
            expect(buttons.first()).to.have.text('Hit');
            expect(buttons.last()).to.have.text('Stand');
        });
        
        it('enables hit and stand buttons', () => {
            buttons.forEach((b) => {
                expect(b).to.not.have.attr('disabled');
            });
        });
    });
    
    describe('when hasStood is true', () => {
        const rendered = shallow(<Info winCount={1} lossCount={2} hasStood={true} />);
        
        it('disables hit and stand buttons', () => {
            const buttons = rendered.find('button');
            buttons.forEach((b) => {
                expect(b).to.have.attr('disabled');
            });
        });
    });
    
}); 