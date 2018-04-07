import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, withProps } from 'recompose';
import { getProject as getProjectSelector, getCurrentStep } from '../projectReducer';
import { getProject, replyToLead } from '../projectAction';
import { Card, Steps, Form, Input } from 'antd';
import { getSelectedProviderProfile } from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const mapStateToProps = state => ({
  ...getSelectedProviderProfile(state),
  ...getProjectSelector(state),
  ...getCurrentStep(state)
});

const mapDispatchToProps = dispatch => ({
  getProject: (providerId, projectId) => dispatch(getProject(providerId, projectId))
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  mapImmutablePropsToPlainProps,
  lifecycle({
    componentDidMount() {
      this.props.getProject(this.props.selectedProviderProfile.id, this.props.match.params.projectId);
    }
  }),
);
export default enhance(Detail);

