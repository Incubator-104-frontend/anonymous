import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import React from 'react';

import App from './container/App.js'; 
import Home from './container/home';

const PageRouter = () => {
    return(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                 <IndexRoute component={Home}/>
            </Route>
        </Router>
    )
}
export default PageRouter;