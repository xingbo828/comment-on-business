import axios from 'axios';
import getConfig from '../../../../../config';

const config = getConfig();

export const searchBusiness = ({ term }) => {
  return axios.get(`${config.cloudFunctionDomain}/providers/yelp/search?term=${term}`).then(d=>d.data)
}