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

  const replyToLead = (projectId, {
    estimatedPrice,
    notes
  }) => projectHttpClient.put(`/projects/${projectId}`, {
    estimatedPrice,
    notes,
    action: 'accept'
  });

  const declineLead = projectId =>
    projectHttpClient.put(`/projects/${projectId}`, {
      action: 'reject'
    });

  return {
    getProject,
    getProjects,
    replyToLead,
    declineLead
  };
};

export default memoize(createProjectHttpClient);
