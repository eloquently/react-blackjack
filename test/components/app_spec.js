// test/components/app_spec.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import App from '../../app/components/app';

const state = new Map( { winCount: 0, lossCount: 0, hasStood: false } );

describe('<App />', () => {
    const rendered = shallow(<App state={state} />);
    
    it('renders one <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
    
    it('passes props to <Info />', () => {
        expect(rendered.find('Info').first()).to.have.prop('winCount');
        expect(rendered.find('Info').first()).to.have.prop('lossCount');
        expect(rendered.find('Info').first()).to.have.prop('hasStood');
    });
});