import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch, IndexRoute, browserHistory, hashHistory } from 'react-router-dom';
import App from './App.jsx';
import AppIndex from './AppIndex.jsx';
import AppAbout from './AppAbout.jsx';
import reducers from './reducers';


const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);


try {
    ReactDOM.render((
        <Provider store={ store }>
            <Router history={ window.location.protocol.match(/^https?:?$/) ? browserHistory : hashHistory }>
                <App>
                    <Switch>
                        <Route exact path="/" component={ AppIndex } />
                        <Route path="/about" component={ AppAbout } />
                        <Route path="/sheet" render={ (props) =>
                            <AppIndex isModalOpen={true} { ...props } />
                        } />
                    </Switch>
                </App>
            </Router>
        </Provider>
    ), document.getElementById('app-root'));
} catch(exc) {
    alert('Some really weird thing has happened during application loading...');
    throw exc;
}
