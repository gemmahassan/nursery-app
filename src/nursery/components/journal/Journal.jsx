import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child";
import {useParams, useLocation} from "react-router-dom";
import { Timeline, DatePicker } from 'antd';
import { IonContent } from '@ionic/react';
import moment from 'moment';
import JournalEntry from "./JournalEntry";

import 'antd/dist/antd.css';

const Journal = () => {
  const { childId, date } = useParams();
  const { state } = useLocation();

  const [journal, setJournal] = useState([]);
  const [activeDate, setActiveDate] = useState(date);

  const getJournal = (date) => {
    ChildDataService.getJournal(date, childId)
      .then(response => {
        setJournal(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onDateChange = (date, dateString) => {
    if (!date) return;
    setActiveDate(dateString);
    getJournal(dateString);
  }

  useEffect(() => {
    getJournal(activeDate);
  }, []);

  console.log('activedate: ', activeDate);

  return (
    <IonContent>
      <div className="ion-text-center">
      <h1>{`${state.firstName}'s Day - ${moment(activeDate).format("dddd, MMMM Do YYYY")}`}</h1>
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