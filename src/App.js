import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from './modules/Account/Login';
import Overview from './modules/Overview';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
