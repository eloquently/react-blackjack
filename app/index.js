import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/app.js';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import { setupGame, setRecord } from '../app/action_creators';
import { watchStand } from './sagas';


require('./css/main.scss');


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, undefined, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(watchStand, store.getState);

store.dispatch(setRecord(0, 0));
store.dispatch(setupGame());

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);