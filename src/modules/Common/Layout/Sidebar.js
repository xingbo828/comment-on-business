import React from 'react';
import { withRouter } from 'react-router-dom';
import includes from 'lodash/includes';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

const Sidebar = ({ history, location }) => {
  const navItems = [{
    key: '/projects',
    icon: 'schedule',
    text: 'Projects'
  },{
    key: '/conversations',
    icon: 'message',
    text: 'Conversations'
  },{
    key: '/company-profile',
    icon: 'profile',
    text: 'Company Profile'
  }];
  const onSelect = e => {
    history.push({ pathname: e.key });
  };

  const getSelectKey = (items, lo) => {
    const currentPathname = lo.pathname;
    const navItem = items.find((item) => includes(currentPathname, item.key));
    return navItem ? [navItem.key] : [];
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        className="logo"
        style={{
          height: 60,
          color: 'white',
          fontSize: '1.1rem',
          lineHeight: '60px',
          textAlign: 'center'
        }}
      >
        LOGO
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectKey(navItems, location)}
        onSelect={onSelect}
      >
      {
        navItems.map(item => (
          <Menu.Item key={item.key}>
            <Icon type={item.icon} />
            <span className="nav-text">{item.text}</span>
          </Menu.Item>
        ))
      }
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
