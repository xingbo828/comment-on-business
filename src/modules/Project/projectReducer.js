import Immutable from 'immutable';
import {
  GET_MY_PROJECTS_PENDING,
  GET_MY_PROJECTS_SUCCESS,
  GET_MY_PROJECTS_FAIL,
  GET_MY_PROJECT_PENDING,
  GET_MY_PROJECT_SUCCESS,
} from './projectAction';

const initState = Immutable.fromJS({
  status: 'UNINIT',
  projects: null
});
const stepMap = {sent: 0, accept: 1, completed: 2, reject: 3}

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
        st.set('projects', action.data);
      });
    }

    case GET_MY_PROJECTS_FAIL: {
      return state.withMutations(st => {
        st.set('status', 'FAILED');
        st.set('projects', null);
      });
    }

    case GET_MY_PROJECT_PENDING: {
      return state.withMutations(st => {
        st.set('status', 'PENDING');
        st.set('project', null);
      });
    }

    case GET_MY_PROJECT_SUCCESS: {
      return state.withMutations(st => {
        action.data.step = stepMap[action.data.receiver.status];
        st.set('status', 'LOADED');
        st.set('project', action.data);
      });
    }

    default:
      return state;
  }
};

export const getProjects = state => {
 return {projects: state.getIn(['project', 'projects']) }
};

export const getProject = state => {
  return {project: state.getIn(['project', 'project']) }
 };