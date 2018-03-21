import React from 'react';
import { Layout } from 'antd';
import ProfileDropDown from './ProfileDropdown';

const { Header, Content } = Layout;

const OneColumnLayout = ({ children }) => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 12px 0 40px' }}>
        <div style={{ float: 'right' }}>
          <ProfileDropDown />
        </div>
      </Header>
      <Content
        style={{
          width: '100%',
          padding: '40px',
          margin: '0 auto',
          background: '#fff'
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default OneColumnLayout;
