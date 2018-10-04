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
import ResetPassword from './modules/Account/ResetPassword';
import RegisterCompany from './modules/Account/CompanyProfile/Register';
import EditCompanyProfile from './modules/Account/CompanyProfile/Edit';
import Project from './modules/Project';
import Calendar from './modules/Calendar';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <ProtectedRoute path="/register" component={RegisterCompany} />
          <ProtectedRoute path="/projects" component={Project} />
          <ProtectedRoute path="/calendar" component={Calendar} />
          <ProtectedRoute path="/company-profile" component={EditCompanyProfile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
