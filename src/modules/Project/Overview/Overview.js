import React from 'react';
import { Table, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { H1 } from '../../Common/Components/Heading';

const ProjectOverview = ({ projectsOverview: { projects, status } }) => {
  const renderStatus = status => {
    if (status === 'sent') {
      return <Badge status="warning" text="Waiting for input" />;
    } else if (status === 'accept') {
      return <Badge status="processing" text="Waiting for customer response" />;
    } else if (status === 'confirmed') {
      return <Badge status="success" text="Contact customer" />;
    }
    return null;
  };
  const columns = [

    {
      title: 'Status',
      dataIndex: 'providerStatus',
      filters: [
        {
          text: 'Waiting for input',
          value: 'sent'
        },
        {
          text: 'Waiting for response',
          value: 'accept'
        },
        {
          text: 'Customer confirmed',
          value: 'confirmed'
        }
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.providerStatus === value;
      },
      render: (text, project) => renderStatus(text)
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      sorter: (a, b) => a.customerName > b.customerName
    },
    {
      title: 'Creation date',
      dataIndex: 'creationDate',
      render: (text) => text.format('MMMM, DD, YYYY'),
      sorter: (a, b) => {
        return a.creationDate > b.creationDate
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, project) => (
        <Link to={`/projects/${project.id}`}>View detail</Link>
      )
    },
  ];
  return (
    <div>
      <H1>Project Overview</H1>
      <Table
        loading={status === 'PENDING'}
        rowKey={record => record.id}
        dataSource={projects}
        columns={columns}
      />
    </div>
  );
};

export default ProjectOverview;
