import React from "react";
import {
  IonButton
} from "@ionic/react";
import {Button, Timeline, DatePicker, Layout, Tabs} from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
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
          <IonButton onClick={() => {
            Notification.requestPermission()
              .then((permission) => {
                if (permission === 'granted') {
                  setNotifyWhenNew(!notifyWhenNew);
                }
              })
          }}>{notifyWhenNew && 'Dont '}Notify Me</IonButton>
          <IonButton type={'primary'} onClick={() => {
            setSpeakWhenNew(!speakWhenNew);
          }}>{speakWhenNew && 'Dont '}Tell Me</IonButton>
          <br/>
        </>
        }
        <DatePicker defaultValue={moment()}
                    format={'YYYY-M-D'}
                    disabledDate={d => !d || d.isAfter(moment())}
                    onChange={onDateChange}/>

        <Layout style={{minHeight: '100vh'}}>
          {role === 'carer' ?
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
            </Tabs> :
            <>
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
            </>}
        </Layout>
      </div>
    </>
  );
}

export default Journal;