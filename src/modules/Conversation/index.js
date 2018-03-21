import React from 'react';
import withLayout from '../Common/withLayout';
import { Route, Switch } from 'react-router-dom';
import ConversationOverview from './Overview';
import ConversationDetail from './Detail';
import DashboardLayout from '../Common/Layout/DashboardLayout';

const Conversation = () => {
  return (
    <Switch>
      <Route path="/conversations" component={ConversationOverview} />
      <Route path="/conversations/:conversationId" component={ConversationDetail} />
    </Switch>
  );
};

export default withLayout(DashboardLayout)(Conversation);
