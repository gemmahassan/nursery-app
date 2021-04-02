import React, {useEffect, useState} from 'react';
import {Badge} from "antd";
import moment from 'moment';
import CalendarDataService from "../../../services/calendar";
import '../../style.css';
import NurseryCalendar from "./NurseryCalendar";

const NurseryCalendarContainer = ({nurseryId}) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    CalendarDataService.getAllCalendarEntries(nurseryId)
      .then(response => {
        setEntries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  if (!entries) return null;

  function getListData(value) {
    const givenDate = value.format('YYYY-MM-DD');
    const matchingEntries = entries.filter(entry => moment(entry.date).format('YYYY-MM-DD') === givenDate);
    if (matchingEntries.length) {
      return matchingEntries.map((entry) => {
        return {type: 'success', content: entry.description}
      });
    }
    return [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <NurseryCalendar
        dateCellRender={dateCellRender}
      />
    </>
  )
};

export default NurseryCalendarContainer;
