import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './ducks/messaging';
import initApp from './App';

const DEBUG = process.env.NODE_ENV !== 'production';

/* eslint-disable */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

/* eslint-enable */

const middleware = [
    thunk,
    createLogger(),
];

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
);

const store = createStore(
    rootReducer,
    enhancer,
);

function init() {
    initApp('react-container', store);
}

export {init}; // eslint-disable-line import/prefer-default-export
