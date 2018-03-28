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
  color: white;
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
      <Dropdown overlay={menu} placement="bottomLeft" disabled={availableProviderProfiles.length <= 1}>
        <div>
        {selectedProviderProfile.logo && (
          <Avatar src={selectedProviderProfile.logo} size="large" style={{marginRight: 10}} />
        )}
        {selectedProviderProfile.name}
        {availableProviderProfiles.length > 1 && <Icon type="down" style={{marginLeft: 5, fontSize: '.9rem'}} />}
        </div>
        </Dropdown>
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
