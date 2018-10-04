import createHttpClient from '../../HttpClient';
import { auth } from '../../firebaseClient';
import memoize from 'lodash/memoize';

const createCalendarEventHttpClient = async providerId => {
  const myToken = await auth.currentUser.getIdToken(true);
  const calendarEventtHttpClient = createHttpClient();
  calendarEventtHttpClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${myToken}`;

  calendarEventtHttpClient.defaults.headers.common['Provider'] = providerId;

  const getCalendarEvents = ({ startDateTime, endDateTime }) =>
    calendarEventtHttpClient.get(
      `/projects/?filterStartDate=${startDateTime}&filterEndDate=${endDateTime}`
    );

  return {
    getCalendarEvents
  };
};

export default memoize(createCalendarEventHttpClient);
