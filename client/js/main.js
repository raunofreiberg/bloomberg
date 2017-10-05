import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import initApp from './App';

const DEBUG = process.env.NODE_ENV !== 'production';

const createMessagingStore = (reducer) => {
    /* eslint-disable */
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    /* eslint-enable */

    const middleware = [];

    !DEBUG ? middleware.push(thunk) : middleware.push(thunk, createLogger());

    const enhancer = composeEnhancers(
        applyMiddleware(...middleware),
    );

    return createStore(reducer, enhancer);
};

const store = createMessagingStore(rootReducer);


function init() {
    initApp('react-container', store);
}

export { init }; // eslint-disable-line import/prefer-default-export