import React from 'react';

import DashboardLayout from './Layout/DashboardLayout';

const withDashboardLayout = WrappedComponent => {
  const DashboardLayoutView = props => {
    return (
      <DashboardLayout>
        <WrappedComponent {...props} />
      </DashboardLayout>
    );
  };
  return DashboardLayoutView;
};

export default withDashboardLayout;
