import Immutable from 'immutable';
import isUndefined from 'lodash/isUndefined';
import { createSelector } from 'reselect';
import { USER_LOGIN, USER_LOGOUT } from './onAuthChangeAction';
import { UPDATE_PROFILE, DEFAULT_PROVIDER_CHANGE } from './accountAction';

const initState = Immutable.fromJS({
  status: 'UNINIT',
  user: {}
});

export default (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return state.withMutations((st) => {
        st.set('user', Immutable.fromJS(action.data));
        st.set('status', 'AUTHENTICATED');
      });
    case USER_LOGOUT:
      return state.withMutations((st) => {
        st.set('user', Immutable.fromJS({}));
        st.set('status', 'NOT_AUTHENTICATED');
      });
    case UPDATE_PROFILE:
      return state.withMutations((st) => {
        const providerId = action.data.providerId;
        // if user hook hasn't got a chance to run, set user => providers => to be new list.
        if(!st.hasIn(['user', 'providers'])) {
          st.setIn(['user', 'providers'], Immutable.List())
        }

        const index = st.getIn(['user', 'providers']).findKey(o => o.get('id') === providerId)
        // Is new provider info
        if(isUndefined(index)) {
          const newProviderList = st.getIn(['user', 'providers']).push(Immutable.fromJS(action.data.providerInfo));
          st.setIn(['user', 'providers'], newProviderList)
        } 
        // update existing provider info
        else {
          st.setIn(['user', 'providers', index], Immutable.fromJS(action.data.providerInfo))
        }
      });
    case DEFAULT_PROVIDER_CHANGE:
      return state.withMutations((st) => {
        st.setIn(['user', 'defaultProvider'], action.data);
      });

    default:
      return state;
  }
};


// Selectors
export const getUser = (state) => ({ user: state.getIn(['account', 'user'])});
export const getAccount = state => ({ account: state.get('account') });

export const isLoggedin = createSelector(
  [ getAccount ], ({ account }) => ({ isLoggedIn: account.get('user').size > 0 && account.getIn(['user', 'emailVerified']), user: account.get('user'), loginStatus: account.get('status')})
);

export const getSelectedProviderProfile = state => {
  const user = state.getIn(['account', 'user']);
  const defaultProviderId = user.get('defaultProvider');
  const providerProfile = user.get('providers').find(p => {
    return p.get('id') === defaultProviderId
  });
  if(isUndefined(providerProfile)) {
    return { selectedProviderProfile: user.getIn(['providers', 0 ]) }
  }
  return { selectedProviderProfile: providerProfile }
}

export const getAvailableProviderProfiles = state => {
  return {
    availableProviderProfiles: state.getIn(['account', 'user', 'providers'])
  }
}


