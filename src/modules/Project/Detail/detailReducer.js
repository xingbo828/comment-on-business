import Immutable from 'immutable';
import {
  GET_MY_PROJECT_DETAIL_PENDING,
  GET_MY_PROJECT_DETAIL_SUCCESS,
  GET_MY_PROJECT_DETAIL_FAIL
} from '../projectAction';

const initState = Immutable.fromJS({
  status: 'UNINIT',
  projectDetail: null
});

const stepMap = {sent: 0, accept: 1, confirmed: 2, reject: 3}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MY_PROJECT_DETAIL_PENDING: {
      return state.withMutations(st => {
        st.set('status', 'PENDING');
        st.set('projectDetail', null);
      });
    }

    case GET_MY_PROJECT_DETAIL_SUCCESS: {
      return state.withMutations(st => {
        st.set('status', 'LOADED');
        st.set('projectDetail', Immutable.fromJS(action.data));
      });
    }

    case GET_MY_PROJECT_DETAIL_FAIL: {
      return state.withMutations(st => {
        st.set('status', 'FAILED');
        st.set('projectDetail', null);
      });
    }

    default:
      return state;
  }
};

export const getProjectDetail = state => {
  return { project: state.getIn(['project', 'detail']) };
};

export const getCurrentStep = state => {
  let currentStep =
    stepMap[state.getIn(['project', 'detail', 'projectDetail', 'receiver', 'status'])] || 0;
  let isRejected = false;

  if (currentStep === 3) {
    currentStep = 1;
    isRejected = true;
  }

  return { currentStep, isRejected };
};
