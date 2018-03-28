import { combineReducers } from 'redux-immutable';
import account from '../modules/Account/accountReducer';
import project from '../modules/Project/projectReducer';

const rootReducer = combineReducers({
  account,
  project
});

export default rootReducer;
