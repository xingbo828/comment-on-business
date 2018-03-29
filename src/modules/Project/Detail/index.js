import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, withProps } from 'recompose';
import { getProject as getProjectSelector } from '../projectReducer';
import { getProject, replyToLead } from '../projectAction';
import { Card, Steps, Form, Input } from 'antd';
import { getSelectedProviderProfile } from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const mapStateToProps = state => ({
  ...getSelectedProviderProfile(state),
  ...getProjectSelector(state)
});

const mapDispatchToProps = dispatch => ({
  getProject: (providerId, projectId) => dispatch(getProject(providerId, projectId)),
  replyToLead: (providerId, projectId, payload, accept) => dispatch(replyToLead(providerId, projectId, payload, accept)),
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
  withProps(props => ({
    submitForm: async (payload, accept) => {
      await props.replyToLead({providerId: props.selectedProviderProfile.id, projectId: props.match.params.projectId, payload, accept});
      props.getProject(props.selectedProviderProfile.id, props.match.params.projectId);
    }
  })),
  Form.create({
    mapPropsToFields({ project }) {
      return;
    }
  })
);
export default enhance(Detail);

