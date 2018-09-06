import React from 'react';
import truncate from 'lodash/truncate';
import toUpper from 'lodash/toUpper';
import {
  Table,
  Badge,
  // Tabs
  } from 'antd';
import { Link } from 'react-router-dom';
import { H1 } from '../../Common/Components/Heading';

// const TabPane = Tabs.TabPane;

const ProjectOverview = ({ projectsOverview: { projects, status } }) => {
  // const renderStatus = status => {
  //   if (status === 'sent') {
  //     return <Badge status="warning" text="Waiting for input" />;
  //   } else if (status === 'accept') {
  //     return <Badge status="processing" text="Waiting for customer response" />;
  //   } else if (status === 'confirmed') {
  //     return <Badge status="success" text="Contact customer" />;
  //   }
  //   return null;
  // };

  const myProjectsColumns = [
    {
      title: 'Status',
      width: 100,
      align: 'center',
      dataIndex: 'providerStatus',
      filters: [
        { value: 'ACTIVE', text: 'active' },
        { value: 'INACTIVE', text: 'inactive' },
      ],
      filteredValue: ['ACTIVE'],
      filterMultiple: false,
      onFilter: (value, record) => record.providerStatus === value,
      render: (text) => text === 'INACTIVE' ? <Badge status="error" /> : <Badge status="success" />
    },
    {
      title: 'Creation date',
      dataIndex: 'creationDate',
      width: 180,
      render: (text) => text.format('MMMM, DD, YYYY'),
      sorter: (a, b) => {
        return a.creationDate > b.creationDate
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      render: (id) => toUpper(truncate(id, { length: 6, omission: '' }))
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      width: 200,
      sorter: (a, b) => a.customerName > b.customerName
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text, project) => (
        <Link to={{
          pathname: `/projects/${project.id}`,
          state: { projectType: project.type }
        }}>View detail</Link>
      )
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      render: (text) => truncate(text, { length: 50 })
    },
  ];

  // const activeProjectsColumns = [
  //   {
  //     title: 'Customer',
  //     dataIndex: 'customerName',
  //     sorter: (a, b) => a.customerName > b.customerName
  //   },
  //   {
  //     title: 'ID',
  //     dataIndex: 'id'
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'providerStatus',
  //     filters: [
  //       {
  //         text: 'Waiting for input',
  //         value: 'sent'
  //       },
  //       {
  //         text: 'Waiting for response',
  //         value: 'accept'
  //       },
  //       {
  //         text: 'Customer confirmed',
  //         value: 'confirmed'
  //       }
  //     ],
  //     filterMultiple: false,
  //     onFilter: (value, record) => {
  //       return record.providerStatus === value;
  //     },
  //     render: (text, project) => renderStatus(text)
  //   },
  //   {
  //     title: 'Creation date',
  //     dataIndex: 'creationDate',
  //     render: (text) => text.format('MMMM, DD, YYYY'),
  //     sorter: (a, b) => {
  //       return a.creationDate > b.creationDate
  //     }
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text, project) => (
  //       <Link to={`/projects/${project.id}`}>View detail</Link>
  //     )
  //   }
  // ];

  // const renderArchivedStatus = (project) => {
  //   if (project.providerStatus === 'reject') {
  //     return <Badge status="error" text="Reject by you" />;
  //   } else if (project.projectStatus === 'rejected') {
  //     return <Badge status="default" text="Project is closed" />;
  //   } 
  //   return null;
  // }

  // const archivedProjectsColumns = [
  //   {
  //     title: 'Customer',
  //     dataIndex: 'customerName',
  //     sorter: (a, b) => a.customerName > b.customerName
  //   },
  //   {
  //     title: 'ID',
  //     dataIndex: 'id'
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'providerStatus',
  //     render: (text, project) => renderArchivedStatus(project)
  //   },
  //   {
  //     title: 'Creation date',
  //     dataIndex: 'creationDate',
  //     render: (text) => text.format('MMMM, DD, YYYY'),
  //     sorter: (a, b) => {
  //       return a.creationDate > b.creationDate
  //     }
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (text, project) => (
  //       <Link to={`/projects/${project.id}`}>View detail</Link>
  //     )
  //   },
  // ];


  // const activeProjects = projects.filter(p => p.providerStatus!=='reject' && p.projectStatus !== 'rejected');
  // const archivedProjects = projects.filter(p => p.providerStatus==='reject' || p.projectStatus === 'rejected');
  const myProjects = projects.filter(p => p.type === 'DIRECT');
  return (
    <div>
      <H1>My Projects</H1>
      <Table
            loading={status === 'PENDING'}
            pagination={{ pageSize: 10 }}
            rowKey={record => record.id}
            dataSource={myProjects}
            columns={myProjectsColumns}
          />
      {/* <Tabs defaultActiveKey="active">
        <TabPane tab="Active projects" key="active">
          <Table
            loading={status === 'PENDING'}
            pagination={{ pageSize: 10 }}
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
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs> */}

    </div>
  );
};

export default ProjectOverview;
