import React from "react";
import {Button, Timeline, DatePicker, Layout, Tabs} from 'antd';
import moment from 'moment';
import JournalEntry from "./JournalEntry";
import 'antd/dist/antd.css';

const {TabPane} = Tabs;

const Journal = ({
                   isToday,
                   setNotifyWhenNew,
                   notifyWhenNew,
                   setSpeakWhenNew,
                   speakWhenNew,
                   onDateChange,
                   journal,
                   role
                 }) => {
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