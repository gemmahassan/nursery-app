import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child-service";
import {useParams, useLocation} from "react-router-dom";
import { Timeline } from 'antd';
import { IonContent } from '@ionic/react';
import moment from 'moment';
import JournalEntry from "./JournalEntry";

import 'antd/dist/antd.css';

const Journal = () => {
  const { childId } = useParams();
  const { state } = useLocation();

  const [journal, setJournal] = useState([]);

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

  return (
    <IonContent>
      <h1>{`${state.firstName}'s Day - ${moment().format("dddd, MMMM Do YYYY")}`}</h1>
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
    </IonContent>
  );
}

export default Journal;