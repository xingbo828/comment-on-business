import { connect } from 'react-redux';
import Overview from './Overview';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { getProjects as getProjectsSelector } from '../projectReducer';
import { getProjects } from '../projectAction';
import { getSelectedProviderProfile } from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const mapStateToProps = state => ({
  ...getSelectedProviderProfile(state),
  ...getProjectsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  getProjects: (providerId) => dispatch(getProjects(providerId))
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  mapImmutablePropsToPlainProps,
  lifecycle({
    componentDidMount() {
      this.props.getProjects(this.props.selectedProviderProfile.id);
    }
  }),
);
export default enhance(Overview);

