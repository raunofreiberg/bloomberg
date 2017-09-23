import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../scss/main.scss';

import Movies from './components/Messages';

export default function initApp(selector, store) {
    const container = document.getElementById('react-container');

    if (!container) {
        return;
    }

    ReactDOM.render(
        <Provider store={store}>
            <Movies />
        </Provider>,
        container,
    );
};