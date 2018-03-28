import createProjectHttpClient from './projectHttpClient';


export const PROJECT_CREATED = 'PROJECT_CREATED';


export const GET_MY_PROJECTS_PENDING = 'GET_MY_PROJECT_PENDING';
export const GET_MY_PROJECTS_SUCCESS = 'GET_MY_PROJECT_SUCCESS';
export const GET_MY_PROJECTS_FAIL = 'GET_MY_PROJECT_FAIL';

export const getProjects = (providerId) => async dispatch => {
  dispatch({
    type: GET_MY_PROJECTS_PENDING
  });
  const projectHttpClient = await createProjectHttpClient(providerId);
  const projects =  await projectHttpClient.getProjects();

  console.log(projects);
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
