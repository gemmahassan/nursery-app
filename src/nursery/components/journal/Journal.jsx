import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child-service";
import {useParams, useLocation} from "react-router-dom";
import { Timeline, DatePicker } from 'antd';
import { IonContent } from '@ionic/react';
import moment from 'moment';
import JournalEntry from "./JournalEntry";

import 'antd/dist/antd.css';

const Journal = () => {
  const { childId } = useParams();
  const { state } = useLocation();

  const today = moment().format("dddd, MMMM Do YYYY");

  const [journal, setJournal] = useState([]);
  const [activeDate, setActiveDate] = useState(today);

  useEffect(() => {
    getJournal();
  }, []);


  const getJournal = () => {
    ChildDataService.getJournal(childId)
      .then(response => {
        setJournal(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onDateChange = (date, dateString) => {
    if (!date) return;
    const newDate = moment(dateString).format("dddd, MMMM Do YYYY");
    setActiveDate(newDate);
  }

  return (
    <IonContent>
      <div className="ion-text-center">
      <h1>{`${state.firstName}'s Day - ${activeDate}`}</h1>
      <DatePicker disabledDate={d => !d || d.isAfter(moment().format("YYYY-M-D")) } onChange={onDateChange} />
      <Timeline mode="alternate">
        {journal && journal.map(entry => (
          <Timeline.Item>
            <JournalEntry
              id={entry.id}
              image={entry.image}
              staff={entry.staff}
              text={entry.text}
              datetime={entry.timestamp}
              type={entry.type}
            />
            </Timeline.Item>
        ))}
      </Timeline>
      </div>
    </IonContent>
  );
}

export default Journal;