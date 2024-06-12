import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {RecoilRoot} from "recoil";

if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
    </Provider>,
);

reportWebVitals();
