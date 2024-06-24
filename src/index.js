import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RecoilRoot} from "recoil";
import {AuthProvider} from "./utils/authentication/AuthProvider";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </RecoilRoot>
);

reportWebVitals();
