import React from 'react';
import withDashboardLayout from '../Common/withDashboardLayout';
import { Route, Switch } from 'react-router-dom';
import ConversationOverview from './Overview';
import ConversationDetail from './Detail';

const Conversation = () => {
  return (
    <Switch>
      <Route path="/conversations" component={ConversationOverview} />
      <Route path="/conversations/:conversationId" component={ConversationDetail} />
    </Switch>
  );
};

export default withDashboardLayout(Conversation);
