import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child";
import {Button, Timeline, DatePicker, Layout, Tabs} from 'antd';
import moment from 'moment';
import JournalEntry from "./JournalEntry";
import {Speak} from './Speech';
import {usePrevious} from "../../../hooks/usePrevious";
import 'antd/dist/antd.css';

const {TabPane} = Tabs;

// holds reference to interval timer, must be outside component to avoid duplicates
let dataPoller = null;

const Journal = (props) => {
  const {children, role} = props;

  const [journal, setJournal] = useState([]);
  const [activeDate, setActiveDate] = useState();
  const [notifyWhenNew, setNotifyWhenNew] = useState(false);
  const [speakWhenNew, setSpeakWhenNew] = useState(false);
  const [isToday, setIsToday] = useState(activeDate === moment().format("YYYY-M-D"));
  const previousJournalState = usePrevious(journal);

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

  const getData = async () => {
    if (!activeDate) return;

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

  // notify and speak only needed for current date
  const onDateChange = (date, dateString) => {
    if (!date) return;
    setNotifyWhenNew(false);
    setSpeakWhenNew(false);
    setActiveDate(dateString);
  };

  useEffect(() => {
    // resets poller when date changes
    if (dataPoller) {
      clearInterval(dataPoller);
      dataPoller = null;
    }

    // check if selected date is today (to determine whether to show buttons)
    if (activeDate) {
      getData().then(data => {
        setIsToday(activeDate === moment().format("YYYY-M-D"));
        setJournal(data);
      });
    }
  }, [activeDate]);

  useEffect(() => {
    if (children.length > 0) {
      setActiveDate(moment().format("YYYY-M-D"));
    }
  }, [children]);

  useEffect(() => {
    // when notifications selected & journal is updated, loops over new journal,
    if (notifyWhenNew) {
      journal.forEach((child) => {
        const getOldTimelineState = previousJournalState.find(item => item.id === child.id); //gets ref to child in previous state
        if (getOldTimelineState) {
          if (child.timeline.length > getOldTimelineState.timeline.length) { // something has been added
            new Notification(`New Entry For ${child.name}`, {body: `${child.timeline[0].type} at ${moment(child.timeline[0].timestamp).format('h:mma')}`});
          }
        }
      })
    }

    if (speakWhenNew) {
      journal.forEach((child) => {
        const getOldTimelineState = previousJournalState.find(item => item.id === child.id);
        if (getOldTimelineState) {
          if (child.timeline.length > getOldTimelineState.timeline.length) {
            Speak(`New Entry For ${child.name}. ${child.timeline[0].type} at ${moment(child.timeline[0].timestamp).format('h:mma')}`)
          }
        }
      })
    }
  }, [journal])

  // useInterval(() => {
  //   console.log("entered useInterval");
  //   getData().then(data => {
  //     setJournal(data);
  //   });
  // }, 3000);

  // call poller if today and no poller exists
  if (isToday && !dataPoller) {
    dataPoller = setInterval(() => {
      getData().then(data => {
        setJournal(data);
      })
    }, 10000);
  }

  return (
    <>
      <div className="ion-text-center">
        {isToday &&
        <>
          <Button onClick={() => {
            Notification.requestPermission()
              .then((permission) => {
                if (permission === 'granted') {
                  setNotifyWhenNew(!notifyWhenNew);
                }
              })
          }}>{notifyWhenNew && 'Dont '}Notify Me When There's Something New Today</Button>
          <Button onClick={() => {
            setSpeakWhenNew(!speakWhenNew);
          }}>{speakWhenNew && 'Dont '}Tell Me When There's Something New Today</Button>
          <br/>
        </>
        }
        <DatePicker defaultValue={moment()}
                    format={'YYYY-M-D'}
                    disabledDate={d => !d || d.isAfter(moment())}
                    onChange={onDateChange}/>

        <Layout style={{minHeight: '100vh'}}>
          <Tabs type="card">
            {journal.map(entry => {
              return (
                <TabPane tab={entry.name} key={entry.id}>
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
                </TabPane>
              )
            })}
          </Tabs>
        </Layout>
      </div>
    </>
  );
}

export default Journal;