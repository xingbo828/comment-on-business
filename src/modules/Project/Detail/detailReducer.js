import Immutable from 'immutable';
import {
  GET_MY_PROJECT_DETAIL_PENDING,
  GET_MY_PROJECT_DETAIL_SUCCESS,
  GET_MY_PROJECT_DETAIL_FAIL,
  // UPDATE_MY_PROJECT_FAIL,
  UPDATE_MY_PROJECT_SUCCESS,
  // UPDATE_MY_PROJECT_PENDING
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

    case UPDATE_MY_PROJECT_SUCCESS: {
      console.log(action.data)
      return state.withMutations(st => {
        st.setIn([action.projectId, 'projectDetail'], Immutable.fromJS(action.data));
      });
    }

    default:
      return state;
  }
};

export const getProjectDetail = (state, ownProps) => {
  return { project: state.getIn(['project', 'detail', ownProps.match.params.projectId]) };
};

