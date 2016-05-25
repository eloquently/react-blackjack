import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';

export default combineReducers({
    game,
    routing
});