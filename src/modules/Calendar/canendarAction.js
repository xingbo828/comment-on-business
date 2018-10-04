import createCalendarEventHttpClient from './calendarEventHttpClient';

export const GET_MY_CALENDAR_EVENTS_PENDING = 'GET_MY_CALENDAR_EVENTS_PENDING';
export const GET_MY_CALENDAR_EVENTS_SUCCESS = 'GET_MY_CALENDAR_EVENTS_SUCCESS';
export const GET_MY_CALENDAR_EVENTS_FAIL = 'GET_MY_CALENDAR_EVENTS_FAIL';


export const getEvents = (providerId, startDateTime, endDateTime) => async dispatch => {
  dispatch({
    type: GET_MY_CALENDAR_EVENTS_PENDING
  });
  const calendarEventHttpClient = await createCalendarEventHttpClient(providerId);
  const events =  await calendarEventHttpClient.getCalendarEvents({ startDateTime, endDateTime });

  if (events.error) {
    return dispatch({
      type: GET_MY_CALENDAR_EVENTS_FAIL
    });
  }
  dispatch({
    type: GET_MY_CALENDAR_EVENTS_SUCCESS,
    data: events,
  });
};