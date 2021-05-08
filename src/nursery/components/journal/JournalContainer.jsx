import React, {useEffect, useState} from "react";
import ChildDataService from "../../../services/child";
import moment from 'moment';
import {Speak} from './Speech';
import {usePrevious} from "../../../hooks/usePrevious";
import 'antd/dist/antd.css';
import Journal from "./Journal";
import useInterval from "../../../hooks/useInterval";

// holds reference to interval timer, must be outside component to avoid duplicates
let dataPoller = null;

const JournalContainer = (props) => {
  const {children, role} = props;

  const [journal, setJournal] = useState([]);
  const [activeDate, setActiveDate] = useState(moment().format("YYYY-M-D"));
  const [isToday, setIsToday] = useState(activeDate === moment().format("YYYY-M-D"));
  const previousJournalState = usePrevious(journal);
  const [notifyWhenNew, setNotifyWhenNew] = useState(false);
  const [speakWhenNew, setSpeakWhenNew] = useState(false);

  const getJournal = (date, id, name) => {
    // return resolved or rejected promise to the getData() function
    return new Promise((resolve, reject) => {
      // get journal entries for specified child and date
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

    let journalEntries = [];

    // retrieve journal data for each child
    // wait until map has finished before returning the journal entries
    await Promise.all(children.map(async (child) => {
      try {
        const childJournal = await getJournal(activeDate, child.id, child.first_name);
        journalEntries.push(childJournal)
      } catch (error) {
        console.log('error' + error);
      }
    }));

    return journalEntries;
  };

  // notify and speak only needed for current date
  const onDateChange = (date, dateString) => {
    if (!date) return;
    setNotifyWhenNew(false);
    setSpeakWhenNew(false);
    setActiveDate(dateString);
  };

  // if user selects another date from the date picker, get data again
  useEffect(() => {
    // resets poller when date changes
    if (dataPoller) {
      clearInterval(dataPoller);
      dataPoller = null;
    }

    // check if selected date is today (to determine whether to show notification buttons)
    // set state with journal data
    if (activeDate) {
      getData().then(data => {
        setIsToday(activeDate === moment().format("YYYY-M-D"));
        setJournal(data);
      });
    }
  }, [activeDate]);

  // get journal data each time children prop is updated
  useEffect(() => {
    if (children.length > 0) {
      getData().then(data => {
        setIsToday(activeDate === moment().format("YYYY-M-D"));
        setJournal(data);
      });
    }
  }, [children]);

  useEffect(() => {
    // when notifications selected & journal is updated, loops over new journal,
    if (notifyWhenNew) {
      journal.forEach((child) => {
        //gets ref to child in previous state
        const getOldTimelineState = previousJournalState.find(item => item.id === child.id);
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

  // call poller if date is today and no poller already exists
  if (isToday && !dataPoller) {
    dataPoller = setInterval(() => {
      getData().then(data => {
        setJournal(data);
      })
    }, 10000);
  }

  return (
    <Journal
      isToday={isToday}
      setNotifyWhenNew={setNotifyWhenNew}
      notifyWhenNew={notifyWhenNew}
      setSpeakWhenNew={setSpeakWhenNew}
      speakWhenNew={speakWhenNew}
      onDateChange={onDateChange}
      journal={journal}
      role={role}
    />
  );
}

export default JournalContainer;