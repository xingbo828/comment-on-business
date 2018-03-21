import React from 'react';
import withLayout from '../Common/withLayout';
import { Route, Switch } from 'react-router-dom';
import ProjectOverview from './Overview';
import ProjectDetail from './Detail';
import DashboardLayout from '../Common/Layout/DashboardLayout';

const Project = () => {
  return (
    <Switch>
      <Route path="/projects" component={ProjectOverview} />
      <Route path="/projects/:projectId" component={ProjectDetail} />
    </Switch>
  );
};

export default withLayout(DashboardLayout)(Project);
