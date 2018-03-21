import React from 'react';

const withLayout = LayoutWrapper => WrappedComponent => {
  const LayoutView = props => {
    return (
      <LayoutWrapper>
        <WrappedComponent {...props} />
      </LayoutWrapper>
    );
  };
  return LayoutView;
};

export default withLayout;
