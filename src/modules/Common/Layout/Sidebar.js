import React from 'react';
import { withRouter } from 'react-router-dom';
import includes from 'lodash/includes';
import { Layout, Menu, Icon } from 'antd';
import Logo from './Logo';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ history, location }) => {

  const config = [
    {
      key: '/projects',
      text: 'Projects',
      icon: 'schedule'
    },
    {
      key: '/company-profile',
      text: 'Company Profile',
      icon: 'setting',
      subItems: [
        {
          key: '/company-profile/basic',
          text: 'Basic Info'
        },
        {
          key: '/company-profile/payment-methods',
          text: 'Payment Methods'
        },
        {
          key: '/company-profile/review-services',
          text: 'Review Services'
        },
        // {
        //   key: '/company-profile/photo-gallery',
        //   text: 'Photo Gallery'
        // }
      ]
    }
  ];
  const onClick = e => {
    history.push({ pathname: e.key });
  };

  const getSelectKey = (config) => {
    const keys = config.reduce((result, curr) => {
      if(!curr.subItems) {
        if(includes(location.pathname, curr.key)) {
          result = result.concat([curr.key]);
          return result;
        }
        return result;
      } else {
        if(includes(location.pathname, curr.key)) {
          result = result.concat([curr.key]);
        }
        const subKeys = curr.subItems.reduce( (r, c) => {
          if(includes(location.pathname, c.key)) {
            r = r.concat([c.key]);
            return r;
          }
          return r;
        },[]);
        return result.concat(subKeys);
      }
    }, [])
    return keys;
  };

  const renderMenuItems = (config) => {
    return config.map(item => {
      if(!item.subItems) {
        return (
          <Menu.Item key={item.key}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.text}</span>
          </Menu.Item>
        )
      } 
      return (
        <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.text}</span>}>
          {renderMenuItems(item.subItems)}
        </SubMenu>
      )
    })
  }
  const openKeys = getSelectKey(config);
  
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
        onClick={onClick}
        defaultOpenKeys={openKeys}
        selectedKeys={openKeys}
      >
        {renderMenuItems(config)}
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
