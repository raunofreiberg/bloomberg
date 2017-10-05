import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';

import history from './history';
import '../scss/main.scss';

import Messages from './components/Messages';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

export default function initApp(selector, store) {
    const container = document.getElementById('react-container');

    if (!container) {
        return;
    }

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Navbar />
                    <div className="main__container">
                        <Route exact path="/" component={Messages} />
                        <Route path="/signup" component={Signup} />
                    </div>
                </div>
            </Router>
        </Provider>,
        container,
    );
}
