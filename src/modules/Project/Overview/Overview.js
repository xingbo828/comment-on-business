import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom'

import { H1 } from '../../Common/Components/Heading';

const ProjectOverview = ({projects}) => {
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
    dataIndex: 'pickup',
    key: 'pickup',
  }, {
    title: 'Delivery',
    dataIndex: 'delivery',
    key: 'delivery',
  }, {
    title: 'Date',
    dataIndex: 'pickupDate',
    key: 'date',
  }];
  return (
    <div>
      <H1>Project Overview</H1>
      <Table dataSource={projects} columns={columns} />
    </div>
  );
};

export default ProjectOverview;
