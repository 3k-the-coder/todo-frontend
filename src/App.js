import React, { Component } from 'react'
import './styles.css';
import {Router, Route, Switch, Redirect } from "react-router-dom";
import history from './history';
import Home from './containers/Home';
import Main from './containers/Main'
const ProtectedRoute = ({ component: Comp, path,  ...rest }) => {
  return (
        <Route
              path={path}
              render={props => {
                    return localStorage.getItem('email') 
                      ? <Comp {...rest} /> 
                      : <Redirect to="/" />;
                }
              }
        />
  );
};
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <ProtectedRoute path="/main" component={() => <Main/>}/>
            <Route component={Home}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
