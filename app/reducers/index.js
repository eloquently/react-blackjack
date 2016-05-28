import { combineReducers } from 'redux';
import { routerReducer as routing } 
    from 'react-router-redux';

import game from './game';
import settings from './settings';

export default combineReducers({
    game, settings, routing
});