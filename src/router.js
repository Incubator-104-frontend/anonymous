import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import React from 'react';

import App from './container/App.js'; 
import Home from './container/home';

const PageRouter = () => {
    return(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                 <IndexRoute component={Home}/>
            </Route>
        </Router>
    )
}
export default PageRouter;