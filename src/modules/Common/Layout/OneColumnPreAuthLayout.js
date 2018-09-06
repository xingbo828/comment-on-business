import React from 'react';
import { Layout } from 'antd';
import style from 'styled-components'

const { Content } = Layout;

const StyledLayout = style(Layout)`
  padding-top: 200px;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-position: center 110px;
  background-size: 100%;
  height: 100vh;
`;

const StyledContent = style(Content)`
  margin: 0 auto;
  width: 350px;
  flex: 0 0 auto;
`;

const OneColumnLayoutPreAuth = ({ children }) => {
  return (
    <StyledLayout>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledLayout>
  );
};

export default OneColumnLayoutPreAuth;
