import BusinessType from './BusinessType';
import isEmpty from 'lodash/isEmpty';

export default BusinessType;

export const validator = (rule, value, callback) => {
  if(isEmpty(value.primaryType)) {
    callback('Please select primary business type.');
  }
  else if(isEmpty(value.subTypes)) {
    callback('Please select secondary business type(s).');
  }

  callback();
}