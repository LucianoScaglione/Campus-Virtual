import React from 'react'
import '../Home.scss'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function CalendarUpdates() {

  return (
    <div className="calendarupdates">
      <div className='CurrUnitHeader'>
        <h2>Calendario</h2>
      </div>
      <div className='calendar'>
        <Calendar className={"rcalendar"}/>
      </div>
      
    </div>
  );
}

export default CalendarUpdates;