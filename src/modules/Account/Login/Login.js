import React from 'react';
import { Tabs, Icon } from 'antd';

import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

const TabPane = Tabs.TabPane;

const Login = ({
  isSubmitting,
  location,
  account,
  login,
  register,
  facebookLogin,
  googleLogin,
  logout
}) => (
      <Tabs defaultActiveKey="login">
        <TabPane
          tab={
            <span>
              <Icon type="login" />Login
            </span>
          }
          key="login"
        >
          <LoginPanel
            isSubmitting={isSubmitting}
            onSubmit={login}
            facebookLogin={facebookLogin}
            googleLogin={googleLogin}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="user" />Register
            </span>
          }
          key="register"
        >
          <RegisterPanel
            onSubmit={register}
            isSubmitting={isSubmitting}
            facebookLogin={facebookLogin}
            googleLogin={googleLogin}
          />
        </TabPane>
      </Tabs>
);

export default Login;
