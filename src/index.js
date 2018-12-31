import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={App} />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
