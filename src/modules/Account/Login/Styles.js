import style from 'styled-components'
import { Layout, Icon } from 'antd';

const { Content } = Layout;


export const StyledLayout = style(Layout)`
  height: 100vh;
  padding-top: 200px;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
`;

export const StyledContent = style(Content)`
  margin: 0 auto;
  width: 368px;
`;

export const OtherServicesWrapper = style.div`
  line-height: 20px;
  display: flex;
  margin-top: 10px
`;


export const StyledIcon = style(Icon)`
  color: grey;
  margin: 0 .45rem;
  cursor: pointer;
  font-size: 20px;
  transition: .3s;
  &:hover {
    color: ${props=>props.color};
  }
`;