import { combineReducers } from 'redux-immutable';
import overview from './Overview/overviewReducer';
import detail from './Detail/detailReducer';

const projectReducer = combineReducers({
  overview,
  detail
});

export default projectReducer;