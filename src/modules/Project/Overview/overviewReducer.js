import Immutable from 'immutable';
import {
  GET_MY_PROJECTS_PENDING,
  GET_MY_PROJECTS_SUCCESS,
  GET_MY_PROJECTS_FAIL
} from '../projectAction';

const initState = Immutable.fromJS({
  status: 'UNINIT',
  projects: null
});


export default (state = initState, action) => {
  switch (action.type) {
    case GET_MY_PROJECTS_PENDING: {
      return state.withMutations(st => {
        st.set('status', 'PENDING');
        st.set('projects', null);
      });
    }

    case GET_MY_PROJECTS_SUCCESS: {
      return state.withMutations(st => {
        st.set('status', 'LOADED');
        st.set('projects', Immutable.fromJS(action.data));
      });
    }

    case GET_MY_PROJECTS_FAIL: {
      return state.withMutations(st => {
        st.set('status', 'FAILED');
        st.set('projects', null);
      });
    }

    default:
      return state;
  }
};

export const getProjects = state => {
 return { projectsOverview: state.getIn(['project', 'overview']) }
};



