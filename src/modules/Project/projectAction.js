import createProjectHttpClient from './projectHttpClient';


export const PROJECT_CREATED = 'PROJECT_CREATED';


export const GET_MY_PROJECTS_PENDING = 'GET_MY_PROJECTS_PENDING';
export const GET_MY_PROJECTS_SUCCESS = 'GET_MY_PROJECTS_SUCCESS';
export const GET_MY_PROJECTS_FAIL = 'GET_MY_PROJECTS_FAIL';
export const GET_MY_PROJECT_PENDING = 'GET_MY_PROJECT_PENDING';
export const GET_MY_PROJECT_SUCCESS = 'GET_MY_PROJECT_SUCCESS';
export const GET_MY_PROJECT_FAIL = 'GET_MY_PROJECT_FAIL';

export const getProjects = () => async dispatch => {
  dispatch({
    type: GET_MY_PROJECTS_PENDING
  });
  const projectHttpClient = await createProjectHttpClient();
  const projects =  await projectHttpClient.getProjects();

  if (!projects || !Array.isArray(projects) ) {
    return [];
  }
  const result = projects.map(project => {
    return {
       name: project.owner.displayName,
       pickup: project.configuration.addresses.pickUpAddress,
       delivery: project.configuration.addresses.deliveryAddress,
       pickupDate: project.configuration.dateTime.pickUpDate,
       id: project.id
    };
  });

  dispatch({
    type: GET_MY_PROJECTS_SUCCESS,
    data: result,
  });
};

export const getProject = (projectId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECT_PENDING
  });
  const projectHttpClient = await createProjectHttpClient();
  const project =  await projectHttpClient.getProject(projectId);

  if (project.error || !project.receiver) {
    return dispatch({
      type: GET_MY_PROJECT_FAIL,

    });
  }
  dispatch({
    type: GET_MY_PROJECT_SUCCESS,
    data: project,
  });
};
