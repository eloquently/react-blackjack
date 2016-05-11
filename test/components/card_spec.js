// test/components/card_spec.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import Card from '../../app/components/card';

const suit = 'C';
const rank = 2;

describe('<Card />', () => { 
    const rendered = shallow(<Card suit={suit} rank={rank}/>);
    
    it('shows suit and rank', () => {
        expect(rendered).to.include.text(suit);
        expect(rendered).to.include.text(rank);
    });
});