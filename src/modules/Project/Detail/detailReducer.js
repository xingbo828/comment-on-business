import Immutable from 'immutable';
import {
  GET_MY_PROJECT_DETAIL_PENDING,
  GET_MY_PROJECT_DETAIL_SUCCESS,
  GET_MY_PROJECT_DETAIL_FAIL
} from '../projectAction';

const initState = Immutable.fromJS({
});

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MY_PROJECT_DETAIL_PENDING: {
      return state.withMutations(st => {
        st.setIn([action.projectId, 'status'], 'PENDING');
      });
    }

    case GET_MY_PROJECT_DETAIL_SUCCESS: {
      return state.withMutations(st => {
        st.setIn([action.projectId, 'status'], 'LOADED');
        st.setIn([action.projectId, 'projectDetail'], Immutable.fromJS(action.data));
      });
    }

    case GET_MY_PROJECT_DETAIL_FAIL: {
      return state.withMutations(st => {
        st.setIn([action.projectId, 'status'], 'FAILED');
      });
    }

    default:
      return state;
  }
};

export const getProjectDetail = (state, ownProps) => {
  return { project: state.getIn(['project', 'detail', ownProps.match.params.projectId]) };
};

