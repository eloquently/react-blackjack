import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/app.js';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import { setupGame, setRecord } from '../app/action_creators';

require('./css/main.scss');

let store = createStore(reducer, undefined, window.devToolsExtension ? window.devToolsExtension() : undefined);

store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);