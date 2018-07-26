import ServiceAreas from './ServiceAreas';
import isEmpty from 'lodash/isEmpty';

export default ServiceAreas;

export const validator = (rule, value, callback) => {
  if(isEmpty(value)) {
    callback('Please select business service area(s).');
  }
  callback();
}