import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

const BreadcrumbContainer = ({ location }) => {
  const breadcrumbNameMap = {
    '/projects': 'Projects',
    '/conversations': 'Conversations'
  };

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/"><Icon type="home" style={{ fontSize: 16 }}/></Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{ lineHeight: '64px', display: 'inline' }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default withRouter(BreadcrumbContainer);
