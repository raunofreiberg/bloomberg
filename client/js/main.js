import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import {firebase as fbConfig} from './config';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';

import rootReducer from './ducks/movies';
import initApp from './App';

const DEBUG = process.env.NODE_ENV !== 'production';


const middleware = [
    thunk.withExtraArgument(getFirebase),
    createLogger(),
];

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false }),
    ),
);

function init() {
    initApp('react-container', store);
}

export {init}; // eslint-disable-line import/prefer-default-export
