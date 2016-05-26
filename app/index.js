import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, hashHistory } from 'react-router';
import { Map } from 'immutable';


import reducer from './reducers/reducer';
import { setupGame, setRecord } from '../app/action_creators';
import { watchStand } from './sagas';

import { Root } from './components/root';
import { AppContainer } from './components/app';
import { SettingsContainer } from './components/settings';

import { syncHistoryWithStore } from 'react-router-redux';

require('./css/main.scss');

const sagaMiddleware = createSagaMiddleware();

const initialState = { settings: new Map({speed: 750}) };

const store = createStore(reducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(watchStand, store.getState);

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

const routes = <Route component={Root}>
  <Route path="/settings" component={SettingsContainer} />
  <Route path="/" component={AppContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);