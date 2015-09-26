import React from 'react'
import Router from 'react-router'
import {Route} from 'react-router'

require('bootstrap');
require('font-awesome');

class App extends React.Component {
    render() {
        return(
            <div>
                <h1><i className="fa fa-hand-peace-o"></i> Hello World</h1>
                {this.props.children}
            </div>
        );
    }
}

React.render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById("app"));
