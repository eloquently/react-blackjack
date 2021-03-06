import { combineReducers } from 'redux';
import { routerReducer as routing } 
    from 'react-router-redux';
import { reducer as form } from 'redux-form';

import game from './game';
import settings from './settings';
import api from './api';

export default combineReducers({
    game, settings, api, routing, form
});