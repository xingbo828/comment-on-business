import { combineReducers } from 'redux-immutable';
import account from '../modules/Account/accountReducer';
import project from '../modules/Project/projectReducer';
import calendar from '../modules/Calendar/calendarReducer';

const rootReducer = combineReducers({
  account,
  project,
  calendar
});

export default rootReducer;
