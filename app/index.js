import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, browserHistory } from 'react-router'

import reducer from './reducers/reducer';
import { setupGame, setRecord } from '../app/action_creators';
import { watchStand } from './sagas';

import { Root } from './components/root'
import { AppContainer } from './components/app';
import { Settings } from './components/settings';


require('./css/main.scss');


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, undefined, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(watchStand, store.getState);

store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

const routes = <Route component={Root}>
  <Route path="/settings" component={Settings} />
  <Route path="/" component={AppContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);