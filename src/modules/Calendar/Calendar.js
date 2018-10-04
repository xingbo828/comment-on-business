import React from 'react';
import { Calendar, Badge, Drawer, List, Icon } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment'
import isUndefined from 'lodash/isUndefined'
import truncate from 'lodash/truncate';

import { Container } from './styles';

const formatEventsData = (allEvents, date) => {
  return allEvents.filter((e) => {
    const eventDate = moment(e.receiver.date)
    return date.isSame(eventDate, 'day')
  })
}

const dateCellRender = allEvents => (date) => {
  if(allEvents.length === 0) {
    return null;
  }
  const events = formatEventsData(allEvents, date);
  return (
    <Container>
      {events.map(event => (
        <li key={event.id}>
          <Badge status="success" text={event.owner.displayName} />
        </li>
      ))}
    </Container>
  );
}

const renderListItem = event => {
  const pickUpDateTime = moment(event.receiver.date)
  return (
    <List.Item
      actions={[
        <Link
          to={{
            pathname: `/projects/${event.id}`,
            state: { projectType: 'DIRECT' }
          }}
        >
          view project detail
        </Link>
      ]}
    >
      <List.Item.Meta
        title={`${event.owner.displayName}`}
        description={truncate(event.receiver.notes, { length: 50 })}
      />
      <div>
        <Icon type="calendar" theme="outlined" />
        {pickUpDateTime.format('YYYY-MM-DD HH:mm')}
      </div>
    </List.Item>
  );
};

const getListDataSource = (selectedDate, allEvents) => {
  if(isUndefined(selectedDate)) {
    return []
  }
  return formatEventsData(allEvents, selectedDate);
}


const CalendarView = ({ calendar, onCalendarPandleChange, onDateSelect, selectedDate, closeDrawer, isDrawerOpen }) => {
  return (
    <React.Fragment>
      <Calendar
        mode="month"
        dateCellRender={dateCellRender(calendar.events)}
        onSelect={onDateSelect}
        onPanelChange={onCalendarPandleChange}
      />
      <Drawer
        width={700}
        placement="right"
        closable
        visible={isDrawerOpen}
        onClose={closeDrawer}
      >
        {selectedDate && <p style={{ fontSize: 16, marginBottom: 24 }}>{selectedDate.format('dddd, MMMM Do YYYY')}</p>}
        <List
          bordered
          dataSource={getListDataSource(selectedDate, calendar.events)}
          size="large"
          renderItem={renderListItem}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default CalendarView;
