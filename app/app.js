import React from 'react'
import Router, {Route} from 'react-router'

require('bootstrap-webpack');
require('font-awesome-webpack');

class App extends React.Component {
    render() {
        return(
            <div>
                <h1><i className="fa fa-hand-peace-o"/> {'Hello World'}</h1>
                {this.props.children}
            </div>
        );
    }
}

React.render((
  <Router>
    <Route path="/" component={App} />
  </Router>
), document.getElementById("app"));
