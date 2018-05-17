import React from 'react';
import { compose, withProps } from 'recompose';
import { Menu, Dropdown, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebaseClient';
import isLoggedin from '../isLoggedIn';

const ProfileDropdown = ({ user, logout }) => {
  const clickHandler = (e) => {
    if(e.key === 'logout') {
      logout();
    }
  };

  const profileDropDown = (
    <Menu  onClick={clickHandler}>
      <Menu.Item key="register">
          <Link to="/register" style={{display: 'block'}}><Icon type="shop" /> Register new company</Link>
      </Menu.Item>
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
        { user.photoURL ? <Avatar size="large" src={user.photoURL} /> : <Avatar size="large" icon="user" />}
      </a>
    </Dropdown>
  );
};

const logout = () => {
  auth.signOut();
};

const enhance = compose(
  isLoggedin,
  withProps(props => ({
  logout
})))

export default enhance(ProfileDropdown);







