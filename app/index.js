import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/app.js';
import { createStore, applyMiddleware,
         compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers/index';
import { setupGame,
         setRecord } from '../app/action_creators';
import watchActions from './sagas/index';
import { Settings } from './components/settings';

require('./css/main.scss');

const initialState = { settings: new Map({speed: 750}) };

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? 
        window.devToolsExtension() : f => f
));

sagaMiddleware.run(watchActions);

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer} />
            <Route path="/settings" component={Settings} />
        </Router>
    </Provider>,
    document.getElementById('app')
);