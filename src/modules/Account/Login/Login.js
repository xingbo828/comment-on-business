import React from 'react';
import { Tabs, Icon } from 'antd';

import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';
import { StyledLayout, StyledContent } from './Styles';

const TabPane = Tabs.TabPane;

const Login = ({ location, account, login, register, facebookLogin, googleLogin, logout }) => (
  <StyledLayout>
    <StyledContent>
      <Tabs defaultActiveKey="login">
        <TabPane
          tab={
            <span>
              <Icon type="login" />Login
            </span>
          }
          key="login"
        >
          <LoginPanel onSubmit={login} facebookLogin={facebookLogin} googleLogin={googleLogin} />
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
            facebookLogin={facebookLogin}
            googleLogin={googleLogin}
          />
        </TabPane>
      </Tabs>
    </StyledContent>
  </StyledLayout>
);

export default Login;
