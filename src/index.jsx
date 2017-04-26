/* global __DEVTOOLS__ __USE_GA__ __GA_ID__ */
/* eslint global-require:0 */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {
    AdCheckout
} from './pages';
const DevTools = require('./pages/DevTools').default;

const store = configureStore({});

class Index extends React.Component {
    render() {
        return <div>
            <Provider store={store}>
                <div>
                    <AdCheckout />
                    <DevTools />
                </div>
            </Provider>
        </div>
    }
}

export default Index;
