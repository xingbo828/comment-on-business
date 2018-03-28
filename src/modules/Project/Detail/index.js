import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { getProjects as getProjectsSelector } from '../projectReducer';
import { getProjects } from '../projectAction';

const mapStateToProps = state => getProjectsSelector(state);

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(getProjects())
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getProjects();
    }
  }),
);
export default enhance(Detail);

