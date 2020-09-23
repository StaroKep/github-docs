import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'src/store/index';

import Application from 'src/components/Application';

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
);
