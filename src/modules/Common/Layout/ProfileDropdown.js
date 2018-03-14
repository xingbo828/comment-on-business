import React from 'react';
import { compose, withProps } from 'recompose';
import { Menu, Dropdown, Avatar, Icon } from 'antd';

import { auth } from '../../../firebaseClient';

const ProfileDropdown = ({ logout }) => {
  const clickHandler = (e) => {
    if(e.key === 'logout') {
      logout();
    }
  };

  const profileDropDown = (
    <Menu style={{ width: '160px' }} onClick={clickHandler}>
      <Menu.Item key="logout">
        <Icon type="logout" /> Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={profileDropDown}
      placement="bottomCenter"
      trigger={['click']}
    >
      <a style={{display: 'block'}} className="ant-dropdown-link" href="">
        <Avatar size="large" icon="user" />
      </a>
    </Dropdown>
  );
};

const logout = () => {
  auth.signOut();
};

const enhance = compose(
  withProps(props => ({
  logout
})))

export default enhance(ProfileDropdown);







