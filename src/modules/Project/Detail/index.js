import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import {
  compose,
  lifecycle,
  renderNothing,
  branch,
  withStateHandlers,
  withHandlers
} from 'recompose';
import isUndefined from 'lodash/isUndefined';
import { message } from 'antd';


import { getProjectDetail as getProjectSelector } from './detailReducer';
import { getProject, archiveProject, restoreProject, updateProject } from '../projectAction';
import { getSelectedProviderProfile } from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const mapStateToProps = (state, ownProps) => ({
  ...getSelectedProviderProfile(state),
  ...getProjectSelector(state, ownProps)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProject,
      updateProject,
      archiveProject,
      restoreProject
    },
    dispatch
  );

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps,
  lifecycle({
    componentDidMount() {
      if (isUndefined(this.props.project)) {
        this.props.getProject(
          this.props.selectedProviderProfile.id,
          this.props.match.params.projectId
        );
      }
    },
    componentWillReceiveProps(nextProps) {
      if (
        this.props.selectedProviderProfile.id !==
        nextProps.selectedProviderProfile.id
      ) {
        this.props.getProjects(nextProps.selectedProviderProfile.id);
      }
    }
  }),
  withStateHandlers(
    {
      isEditFormDrawerVisible: false
    },
    {
      showEditFormDrawer: () => () => ({ isEditFormDrawerVisible: true }),
      hideEditFormDrawer: () => () => ({ isEditFormDrawerVisible: false })
    }
  ),
  withHandlers({
    handleRestore: props => async (e) => {
      await props.restoreProject({
        providerId: props.selectedProviderProfile.id,
        projectId: props.match.params.projectId
      });
      message.info('Project restored');
    },
    handleArchive: props => async (e) => {
      await props.archiveProject({
        providerId: props.selectedProviderProfile.id,
        projectId: props.match.params.projectId
      });
      message.info('Project archived');
    },
    handleEdit: props => e => {
      props.showEditFormDrawer();
    }
  }),
  branch(props => {
    return isUndefined(props.project);
  }, renderNothing)
);
export default enhance(Detail);
