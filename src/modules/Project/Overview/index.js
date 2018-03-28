import React from 'react';
import { connect } from 'react-redux';
import Overview from './Overview';
import { withRouter , Redirect } from 'react-router-dom';
import { compose, withProps, branch, renderNothing, renderComponent, lifecycle } from 'recompose';
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
export default enhance(Overview);

