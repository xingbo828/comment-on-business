import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const BreadcrumbContainer = ({ match }) => {
  const getBreadcrumbItems = (match) => {
    if (!match.isExact) {
      return (
        <Breadcrumb.Item key={match.url}>
          <Link to={match.url}>{match.url.split('/').join(' / ').toUpperCase()}</Link>
        </Breadcrumb.Item>
      );
    }
    return null;
  };

  return (
    <Breadcrumb style={{ lineHeight: '64px', display: 'inline' }}>
      {getBreadcrumbItems(match)}
    </Breadcrumb>
  );
};

export default withRouter(BreadcrumbContainer);
