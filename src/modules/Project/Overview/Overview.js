import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom'
const ProjectOverview = ({projects, getProjects}) => {
  console.log(projects);
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'owner.displayName',
    render: (text, project) => <Link to={`/projects/${project.id}`}>{text}</Link>,
  }, {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  }, {
    title: 'Pick up',
    dataIndex: 'from',
    key: 'from',
  }, {
    title: 'Delivery',
    dataIndex: 'to',
    key: 'to',
  }, {
    title: 'Date',
    dataIndex: 'pickupDate',
    key: 'date',
  }];
  return (
    <div>
      Project Overview
      <Table dataSource={projects} columns={columns} />
    </div>
  );;
};

export default ProjectOverview;
