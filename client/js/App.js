import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';
import { Router, Route, Link } from 'react-router-dom';
import history from './history';


import Messages from './components/Messages';
import Signup from './components/Signup';

export default function initApp(selector, store) {
    const container = document.getElementById('react-container');

    if (!container) {
        return;
    }

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div className="main__container container">
                    <Route exact path="/" component={Messages} />
                    <Route path="/signup" component={Signup} />
                </div>
            </Router>
        </Provider>,
        container,
    );
};