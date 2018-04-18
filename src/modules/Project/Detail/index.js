import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, renderNothing, branch } from 'recompose';
import isUndefined from 'lodash/isUndefined'
import { getProjectDetail as getProjectSelector } from './detailReducer';
import { getProject } from '../projectAction';
import { getSelectedProviderProfile } from '../../Account/accountReducer';
import mapImmutablePropsToPlainProps from '../../Common/mapImmutablePropsToPlainProps';

const mapStateToProps = (state, ownProps) => ({
  ...getSelectedProviderProfile(state),
  ...getProjectSelector(state, ownProps)
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
      if(isUndefined(this.props.project)) {
        this.props.getProject(this.props.selectedProviderProfile.id, this.props.match.params.projectId);
      }
    }
  }),
  branch(props => {
    console.log(props.project)
    return isUndefined(props.project)
  }, renderNothing)
);
export default enhance(Detail);

