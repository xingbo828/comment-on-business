import style from 'styled-components'
import { Icon } from 'antd';



export const OtherServicesWrapper = style.div`
  line-height: 20px;
  display: flex;
  margin-top: 10px
`;


export const StyledIcon = style(Icon)`
  color: rgba(0,0,0,.2);
  margin: 0 .5rem;
  cursor: pointer;
  font-size: 25px;
  transition: .3s;

  &:hover {
    color: ${props=>props.color};
  }
`;