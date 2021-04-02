import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child";
import {Timeline, DatePicker} from 'antd';
import {IonButton, IonContent} from '@ionic/react';
import moment from 'moment';
import JournalEntry from "./JournalEntry";
import AddEntry from "./AddEntry";

import 'antd/dist/antd.css';

const Journal = (props) => {
  const {children, role} = props;

  const [journal, setJournal] = useState([]);
  const [activeDate, setActiveDate] = useState(moment().format("YYYY-M-D"));
  const [showAddModal, setShowAddModal] = useState(false);

  const getJournal = (date, id, name) => {
    return new Promise((resolve, reject) => {
      ChildDataService.getJournal(date, id)
        .then(response => {
          resolve({
            id,
            name,
            timeline: response.data
          });
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  };

  async function getData() {
    let generatedResponse = [];
    await Promise.all(children.map(async (child) => {
      try {
        const childJournal = await getJournal(activeDate, child.id, child.first_name);
        generatedResponse.push(childJournal)
      } catch (error) {
        console.log('error' + error);
      }
    }))
    return generatedResponse;
  };

  const onDateChange = (date, dateString) => {
    if (!date) return;
    setActiveDate(dateString);
  };

  useEffect(() => {
    getData().then(data => {
      setJournal(data);
    });
  }, [activeDate]);

  useEffect(() => {
    if (children.length) {
      setActiveDate(moment().format("YYYY-M-D"));
      getData().then(data => {
        setJournal(data);
      });
    }
  }, [children]);

  return (
    <>
      <div className="ion-text-center">
        <DatePicker defaultValue={moment()} disabledDate={d => !d || d.isAfter(moment().format("YYYY-M-D"))}
                    onChange={onDateChange}/>
        {role !== "carer" &&
        <div>
          <IonButton
            onClick={() => setShowAddModal(true)}
            shape="round">
            +
          </IonButton>
        </div>
        }
        {journal.map(entry => {
          return (
            <div key={entry.id}>
              <h1>{entry.name}</h1>
              <Timeline mode="alternate">
                {entry.timeline.length ? entry.timeline.map(entry => (
                  <Timeline.Item key={entry.id}>
                    <JournalEntry
                      entry={entry}
                      role={role}
                    />
                  </Timeline.Item>
                )) : <p>No entries for {entry.name}</p>}
              </Timeline>
              <hr/>
            </div>
          )
        })}
      </div>
      {showAddModal &&
        <AddEntry
          childId={null}
          showAddModal={showAddModal}
          hideAddModal={() => setShowAddModal(false)}
        />
      }
    </>
  );
}

export default Journal;