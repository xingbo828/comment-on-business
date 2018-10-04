import Immutable from 'immutable';
import {
  GET_MY_CALENDAR_EVENTS_PENDING,
  GET_MY_CALENDAR_EVENTS_SUCCESS,
  GET_MY_CALENDAR_EVENTS_FAIL
} from './canendarAction';

const initState = Immutable.fromJS({
  status: 'UNINIT',
  events: []
});


export default (state = initState, action) => {
  switch (action.type) {
    case GET_MY_CALENDAR_EVENTS_PENDING: {
      return state.withMutations(st => {
        st.set('status', 'PENDING');
      });
    }

    case GET_MY_CALENDAR_EVENTS_SUCCESS: {
      return state.withMutations(st => {
        st.set('status', 'LOADED');
        st.set('events', Immutable.fromJS(action.data));
      });
    }

    case GET_MY_CALENDAR_EVENTS_FAIL: {
      return state.withMutations(st => {
        st.set('status', 'FAILED');
      });
    }

    default:
      return state;
  }
};

export const getCalendarEvents = state => {
 return { calendar: state.getIn(['calendar']) }
};



