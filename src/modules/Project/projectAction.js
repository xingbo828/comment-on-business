import createProjectHttpClient from './projectHttpClient';
import moment from 'moment';

export const PROJECT_CREATED = 'PROJECT_CREATED';


export const GET_MY_PROJECTS_PENDING = 'GET_MY_PROJECTS_PENDING';
export const GET_MY_PROJECTS_SUCCESS = 'GET_MY_PROJECTS_SUCCESS';
export const GET_MY_PROJECTS_FAIL = 'GET_MY_PROJECTS_FAIL';
export const GET_MY_PROJECT_DETAIL_PENDING = 'GET_MY_PROJECT_DETAIL_PENDING';
export const GET_MY_PROJECT_DETAIL_SUCCESS = 'GET_MY_PROJECT_DETAIL_SUCCESS';
export const GET_MY_PROJECT_DETAIL_FAIL = 'GET_MY_PROJECT_DETAIL_FAIL';

export const getProjects = (providerId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECTS_PENDING
  });
  const projectHttpClient = await createProjectHttpClient(providerId);
  const projects =  await projectHttpClient.getProjects();

  if (!projects || !Array.isArray(projects) ) {
    return [];
  }
  const result = projects.map(project => {
    return {
       customerName: project.owner.displayName,
       creationDate: moment(project.creationTimestamp),
       id: project.id,
       providerStatus: project.receiver.status
    };
  }).filter(p => p.providerStatus!=='reject');

  dispatch({
    type: GET_MY_PROJECTS_SUCCESS,
    data: result,
  });
};

export const replyToLead = ({providerId, projectId, payload, accept}) => async dispatch => {
  const projectHttpClient = await createProjectHttpClient(providerId);
  if (accept) {
    await projectHttpClient.replyToLead(projectId, payload);
  } else {
    await projectHttpClient.declineLead(projectId);
  }

  return await getProject(providerId, projectId)(dispatch)
}

export const getProject = (providerId, projectId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECT_DETAIL_PENDING
  });
  const projectHttpClient = await createProjectHttpClient(providerId);
  const project =  await projectHttpClient.getProject(projectId);

  if (project.error || !project.receiver) {
    return dispatch({
      type: GET_MY_PROJECT_DETAIL_FAIL,

    });
  }
  dispatch({
    type: GET_MY_PROJECT_DETAIL_SUCCESS,
    data: project,
  });
};
