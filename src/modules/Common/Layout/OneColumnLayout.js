import React from 'react';
import { Layout } from 'antd';
import style from 'styled-components'

import ProfileDropDown from './ProfileDropdown';

const { Header, Content } = Layout;

const StyledLayout = style(Layout)`
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-position: center 110px;
  background-size: 100%;
`;

const StyledContent = style(Content)`
  padding-top: 40px;
  flex: 0 0 auto;
`;

const StyledHeader = style(Header)`
  background: transparent;
  padding: 0 12px 0 40px;
`;

const StyledProfileDropDownWrapper = style.div`
  float: right;
`;


const OneColumnLayout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <StyledProfileDropDownWrapper>
          <ProfileDropDown />
        </StyledProfileDropDownWrapper>
      </StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledLayout>
  );
};

export default OneColumnLayout;
