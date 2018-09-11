import React from 'react';
import { compose, withProps } from 'recompose';
import { Menu, Dropdown, Avatar } from 'antd';
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
    <Menu onClick={clickHandler}>
      <Menu.Item key="register" style={{ padding: '1rem' }}>
        <Link to="/register" style={{display: 'block'}}> Register new company</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" style={{ padding: '1rem' }}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={profileDropDown}
      placement="bottomCenter"
      trigger={['click']}
    >
      <a style={{display: 'block'}} className="" href="">
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







