import React from 'react'
import Router from 'react-router'
import {RouteHandler, Route, DefaultRoute} from 'react-router'

require('./bower_components/bootstrap/dist/css/bootstrap.css');

class App extends React.Component {
    render() {
        return(
            <div>
                <h1>Hello World</h1>
                <RouteHandler/>
            </div>
        );
    }
}

var routes = (
    <Route handler={App} path="/">
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
