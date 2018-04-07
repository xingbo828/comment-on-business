import React from 'react';
import { withRouter } from 'react-router-dom';
import includes from 'lodash/includes';
import { Layout, Menu, Icon } from 'antd';
import Logo from './Logo';

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
    key: '/company-profile/edit',
    icon: 'profile',
    text: 'Company Profile'
  }];
  const onClick = e => {
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
      <Logo />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectKey(navItems, location)}
        onClick={onClick}
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
