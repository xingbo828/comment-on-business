import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ProtectedRoute from './modules/Common/ProtectedRoute'
import Login from './modules/Account/Login';
import RegisterCompany from './modules/Account/CompanyProfile/Register';
import EditCompanyProfile from './modules/Account/CompanyProfile/Edit';
import Project from './modules/Project';
// import Conversation from './modules/Conversation';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects" />
          </Route>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/register" component={RegisterCompany} />
          <ProtectedRoute path="/projects" component={Project} />
          {/* <ProtectedRoute path="/conversations" component={Conversation} /> */}
          <ProtectedRoute exact path="/company-profile/edit" component={EditCompanyProfile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
