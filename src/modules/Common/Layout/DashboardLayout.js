import React from 'react';
import { Layout } from 'antd';

import Breadcrumb from './BreadcrumbContainer';
import ProfileDropDown from './ProfileDropdown';
import Sidebar from './Sidebar';

const { Header, Content } = Layout;

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ background: '#fff', padding: '0 12px 0 40px' }}>
          <Breadcrumb />
          <div style={{ float: 'right' }}>
            <ProfileDropDown />
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', display: 'flex' }}>
          <div style={{ padding: 24, background: '#fff', width: '100%' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
