import { connect } from 'react-redux';
import Detail from './Detail';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { getProject as getProjectSelector } from '../projectReducer';
import { getProject } from '../projectAction';
import { Card, Steps, Form, Input } from 'antd';

const mapStateToProps = state => getProjectSelector(state);

const mapDispatchToProps = dispatch => ({
  getProject: (projectId) => dispatch(getProject(projectId))
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getProject(this.props.match.params.projectId);
    }
  }),
  Form.create({
    mapPropsToFields({ project }) {
      return;
    }
  })
);
export default enhance(Detail);

