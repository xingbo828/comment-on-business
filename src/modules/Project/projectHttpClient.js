import createHttpClient from '../../HttpClient';
import { auth } from '../../firebaseClient';
import memoize from "lodash/memoize";

const createProjectHttpClient = async (providerId) => {
  const myToken = await auth.currentUser.getIdToken(true);
  const projectHttpClient = createHttpClient();
  projectHttpClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${myToken}`;

  projectHttpClient.defaults.headers.common[
    'Provider'
  ] = providerId;

  const getProject = (projectId) => projectHttpClient.get(`/projects/${projectId}`);
  const getProjects = () => projectHttpClient.get('/projects/');

  // const replyToLead = (projectId, {
  //   estimatedPrice,
  //   notes,
  //   pickUpDates
  // }) => {
  //   return projectHttpClient.put(`/projects/${projectId}`, {
  //     estimatedPrice,
  //     notes,
  //     pickUpDates,
  //     action: 'accept'
  //   });
  // }

  // const declineLead = projectId =>
  //   projectHttpClient.put(`/projects/${projectId}`, {
  //     action: 'reject'
  //   });

  const archiveProject = projectId =>
    projectHttpClient.patch(`/projects/${projectId}/status`, { status: 'INACTIVE' })

  const restoreProject = projectId =>
    projectHttpClient.patch(`/projects/${projectId}/status`, { status: 'ACTIVE' })

  const updateNotes = ({ projectId, notes }) =>
    projectHttpClient.patch(`/projects/${projectId}/notes`, { notes })

  return {
    getProject,
    getProjects,
    // replyToLead,
    // declineLead,
    archiveProject,
    restoreProject,
    updateNotes
  };
};

export default memoize(createProjectHttpClient);
