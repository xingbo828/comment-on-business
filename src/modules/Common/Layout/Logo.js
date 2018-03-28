import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { compose } from 'recompose';
import styled from 'styled-components';
import { setDefaultProvider } from '../../Account/accountAction';
import {
  getSelectedProviderProfile,
  getAvailableProviderProfiles
} from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const LogoContainer = styled.div`
  ${'' /* height: 60px; */} color: white;
  font-size: 1.1rem;
  line-height: 60px;
  text-align: center;
`;

const Logo = ({ selectedProviderProfile, availableProviderProfiles, setDefaultProvider }) => {
  const handleChange = e => {
    setDefaultProvider(e.key)
  };

  const menu = (
    <Menu onClick={handleChange}>
      {availableProviderProfiles.map(p => (
        <Menu.Item key={p.id}>
            {p.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <LogoContainer>
      <div>
        {selectedProviderProfile.logo && (
          <Avatar src={selectedProviderProfile.logo} size="large" />
        )}{' '}
        {selectedProviderProfile.name}
        {availableProviderProfiles.length > 1 && <Dropdown overlay={menu}>
          <span style={{fontSize: '.9rem'}}> <Icon type="down" /></span>
        </Dropdown>}
      </div>
    </LogoContainer>
  );
};

const mapStateToProps = state => ({
  ...getSelectedProviderProfile(state),
  ...getAvailableProviderProfiles(state)
});
const mapDispatchToProps = (dispatch, { uid }) => ({
  setDefaultProvider: providerId => dispatch(setDefaultProvider(providerId))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapImmutablePropsToPlainProps
);
export default enhance(Logo);
