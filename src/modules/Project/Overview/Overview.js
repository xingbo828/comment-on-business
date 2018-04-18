import React from 'react';
import { Table, Badge, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { H1 } from '../../Common/Components/Heading';

const TabPane = Tabs.TabPane;

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
  const activeProjectsColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      sorter: (a, b) => a.customerName > b.customerName
    },
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

  const archivedProjectsColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
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


  const activeProjects = projects.filter(p => p.providerStatus!=='reject' && p.projectStatus !== 'rejected');
  const archivedProjects = projects.filter(p => p.providerStatus==='reject' || p.projectStatus === 'rejected');
  return (
    <div>
      <H1>Project Overview</H1>
      <Tabs defaultActiveKey="active">
        <TabPane tab="Active projects" key="active">
          <Table
            loading={status === 'PENDING'}
            rowKey={record => record.id}
            dataSource={activeProjects}
            columns={activeProjectsColumns}
          />
        </TabPane>
        <TabPane tab="Archived projects" key="archived">
          <Table
            loading={status === 'PENDING'}
            rowKey={record => record.id}
            dataSource={archivedProjects}
            columns={archivedProjectsColumns}
            />
        </TabPane>
      </Tabs>

    </div>
  );
};

export default ProjectOverview;
