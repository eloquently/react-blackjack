import { combineReducers } from 'redux';

import {reducer as form} from 'redux-form';

import game from './game';

export default combineReducers({
    game, 
    form
});