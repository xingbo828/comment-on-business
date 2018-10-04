import { compose, lifecycle, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import mapImmutablePropsToPlainProps from '../Common/mapImmutablePropsToPlainProps';
import DashboardLayout from '../Common/Layout/DashboardLayout';
import Calendar from './Calendar';
import withLayout from '../Common/withLayout';
import { getSelectedProviderProfile } from '../Account/accountReducer';
import { getEvents } from './canendarAction'
import { getCalendarEvents } from './calendarReducer'

const mapStateToProps = state => ({
  ...getCalendarEvents(state),
  ...getSelectedProviderProfile(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEvents
    },
    dispatch
  );


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapImmutablePropsToPlainProps,
  withLayout(DashboardLayout),
  withStateHandlers(
    { isDrawerOpen: false },
    {
      openDrawer: () => () => ({
        isDrawerOpen: true
      }),
      closeDrawer: () => () => ({
        isDrawerOpen: false
      })
    }
  ),
  withStateHandlers(
    { selectedDate: undefined },
    {
      onDateSelect: (state, props) => (date) => {
        props.openDrawer()
        return { selectedDate: date }
      }
    }
  ),
  withHandlers({
    onCalendarPandleChange: props => date => {
      const providerId = props.selectedProviderProfile.id;
      const startDateTime = date.startOf('month').toString();
      const endDateTime = date.endOf('month').toString();
      props.getEvents(providerId, startDateTime, endDateTime)
    }
  }),
  lifecycle({
    componentDidMount() {
      console.log(this.props)
      const providerId = this.props.selectedProviderProfile.id;
      const startDateTime = moment().startOf('month').toString();
      const endDateTime = moment().endOf('month').toString();
      this.props.getEvents(providerId, startDateTime, endDateTime)
    }
  })
)(Calendar);
