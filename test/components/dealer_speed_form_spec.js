import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { DealerSpeedForm } 
    from '../../app/components/dealer_speed_form';

describe('<DealerSpeedForm />', () => {
    const rendered = shallow(<DealerSpeedForm />);
    
    it('renders three radio buttons', () => {
        expect(rendered).to.have.exactly(3)
            .descendants('input[type="radio"]');
    });
    
    it('gives correct speeds to radio buttons', () => {
        const radios = rendered.find('input[type="radio"]');    
        expect(radios.map((el) => el.prop('value'))).to
            .eql([250, 750, 1500]);
    });
});