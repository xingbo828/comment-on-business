import createProjectHttpClient from './projectHttpClient';
import moment from 'moment';

export const PROJECT_CREATED = 'PROJECT_CREATED';


export const GET_MY_PROJECTS_PENDING = 'GET_MY_PROJECTS_PENDING';
export const GET_MY_PROJECTS_SUCCESS = 'GET_MY_PROJECTS_SUCCESS';
export const GET_MY_PROJECTS_FAIL = 'GET_MY_PROJECTS_FAIL';
export const GET_MY_PROJECT_DETAIL_PENDING = 'GET_MY_PROJECT_DETAIL_PENDING';
export const GET_MY_PROJECT_DETAIL_SUCCESS = 'GET_MY_PROJECT_DETAIL_SUCCESS';
export const GET_MY_PROJECT_DETAIL_FAIL = 'GET_MY_PROJECT_DETAIL_FAIL';

export const UPDATE_MY_PROJECT_PENDING = 'UPDATE_MY_PROJECT_PENDING';
export const UPDATE_MY_PROJECT_SUCCESS = 'UPDATE_MY_PROJECT_SUCCESS';
export const UPDATE_MY_PROJECT_FAIL = 'UPDATE_MY_PROJECT_FAIL';


export const getProjects = (providerId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECTS_PENDING
  });
  const projectHttpClient = await createProjectHttpClient(providerId);
  const projects =  await projectHttpClient.getProjects();
  let result;
  if (!projects || !Array.isArray(projects) ) {
    result = [];
  } else {
    result = projects.map(project => {
      return {
        type: project.type,
         customerName: project.owner.displayName,
         creationDate: moment(project.creationTimestamp),
         id: project.id,
         providerStatus: project.receiver.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
         projectStatus: project.status,
         notes: project.receiver.notes,
      };
    }).sort((a ,b) => {
      if(a.creationDate > b.creationDate){
        return -1
      }
      return 1
    });
  }

  dispatch({
    type: GET_MY_PROJECTS_SUCCESS,
    data: result,
  });
};

// export const replyToLead = ({providerId, projectId, payload, accept}) => async dispatch => {
//   const projectHttpClient = await createProjectHttpClient(providerId);
//   if (accept) {
//     await projectHttpClient.replyToLead(projectId, payload);
//   } else {
//     await projectHttpClient.declineLead(projectId);
//   }

//   return await getProject(providerId, projectId)(dispatch)
// }

export const getProject = (providerId, projectId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECT_DETAIL_PENDING,
    projectId
  });
  const projectHttpClient = await createProjectHttpClient(providerId);
  const project =  await projectHttpClient.getProject(projectId);

  if (project.error || !project.receiver) {
    return dispatch({
      type: GET_MY_PROJECT_DETAIL_FAIL,
      projectId
    });
  }
  dispatch({
    type: GET_MY_PROJECT_DETAIL_SUCCESS,
    data: project,
    projectId
  });
};

export const updateProject = ({ providerId, projectId, detail }) => async dispatch => {
  dispatch({
    type: UPDATE_MY_PROJECT_PENDING,
    projectId
  });
  try {
    const projectHttpClient = await createProjectHttpClient(providerId);
    const project = await projectHttpClient.update({ projectId, detail })
    dispatch({
      type: UPDATE_MY_PROJECT_SUCCESS,
      data: project,
      projectId
    });
    return project;
  } catch(error) {
    dispatch({
      type: UPDATE_MY_PROJECT_FAIL,
      projectId
    });
    throw error;
  }
}


export const archiveProject = ({ providerId, projectId }) => async dispatch => {
  dispatch({
    type: UPDATE_MY_PROJECT_PENDING,
    projectId
  });
  try {
    const projectHttpClient = await createProjectHttpClient(providerId);
    const project = await projectHttpClient.archiveProject(projectId)
    dispatch({
      type: UPDATE_MY_PROJECT_SUCCESS,
      data: project,
      projectId
    });
  } catch(error) {
    dispatch({
      type: UPDATE_MY_PROJECT_FAIL,
      projectId
    });
  }
}

export const restoreProject = ({ providerId, projectId }) => async dispatch => {
  dispatch({
    type: UPDATE_MY_PROJECT_PENDING,
    projectId
  });
  try {
    const projectHttpClient = await createProjectHttpClient(providerId);
    const project = await projectHttpClient.restoreProject(projectId)
    dispatch({
      type: UPDATE_MY_PROJECT_SUCCESS,
      data: project,
      projectId
    });
  } catch(error) {
    dispatch({
      type: UPDATE_MY_PROJECT_FAIL,
      projectId
    });
  }
}



