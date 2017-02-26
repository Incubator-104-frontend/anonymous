import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers';
import { reduxReactFirebase } from 'redux-react-firebase'
import { firebaseConfig } from './config';

import './index.css';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}
const createStoreWithFirebase = compose(
    reduxReactFirebase(firebaseConfig),
)(createStore)

let reduxStore = createStoreWithFirebase(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
	<Provider store={reduxStore}>
		<Router />
	</Provider>,
	document.getElementById('root')
);
