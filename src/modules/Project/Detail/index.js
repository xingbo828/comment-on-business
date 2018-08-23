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
import { getProjectDetail as getProjectSelector } from './detailReducer';
import { getProject, archiveProject, restoreProject, updateProjectNotes } from '../projectAction';
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
      updateProjectNotes,
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
      isNotesFormDrawerVisible: false
    },
    {
      showNotesFormDrawer: () => () => ({ isNotesFormDrawerVisible: true }),
      hideNotesFormDrawer: () => () => ({ isNotesFormDrawerVisible: false })
    }
  ),
  withHandlers({
    handleMenuClick: props => e => {
      if (e.key === 'notes') {
        props.showNotesFormDrawer();
      } else if(e.key === 'archive') {
        props.archiveProject({
          providerId: props.selectedProviderProfile.id,
          projectId: props.match.params.projectId
        });
      } else if(e.key === 'restore') {
        props.restoreProject({
          providerId: props.selectedProviderProfile.id,
          projectId: props.match.params.projectId
        });
      }
    }
  }),
  branch(props => {
    return isUndefined(props.project);
  }, renderNothing)
);
export default enhance(Detail);
