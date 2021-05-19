import React from "react";
import { IonButton } from "@ionic/react";
import { Timeline, DatePicker, Layout, Tabs } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import JournalEntryContainer from "./JournalEntryContainer";

const Journal = ({
  isToday,
  setNotifyWhenNew,
  notifyWhenNew,
  setSpeakWhenNew,
  speakWhenNew,
  onDateChange,
  journal,
  role,
}) => {
  const { TabPane } = Tabs;

  // if the selected date is the current date and the user is a carer, display notification buttons
  // these will not display for staff users
  return (
    <>
      <div className="ion-text-center">
        {isToday && role === "carer" && (
          <>
            <IonButton
              // request permission to display notifications
              onClick={() => {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    setNotifyWhenNew(!notifyWhenNew);
                  }
                });
              }}
            >
              {notifyWhenNew && "Dont "}Notify Me
            </IonButton>
            <IonButton
              type={"primary"}
              onClick={() => {
                setSpeakWhenNew(!speakWhenNew);
              }}
            >
              {speakWhenNew && "Dont "}Tell Me
            </IonButton>
            <br />
          </>
        )}

        {/*date picker component*/}
        {/*default date is today*/}
        {/*all future dates are disabled*/}
        <DatePicker
          defaultValue={moment()}
          format={"YYYY-M-D"}
          disabledDate={(d) => !d || d.isAfter(moment())}
          onChange={onDateChange}
        />

        {/*if user is a carer, show tabs for each child associated with them
        show the timeline component, map over each entry for each child and display*/}
        <Layout style={{ minHeight: "100vh" }}>
          {role === "carer" ? (
            <Tabs type="card">
              {journal.map((entry) => {
                return (
                  <TabPane tab={entry.name} key={entry.id}>
                    <h1>{entry.name}'s Day</h1>
                    <Timeline mode="alternate">
                      {entry.timeline.length ? (
                        entry.timeline.map((entry) => (
                          <Timeline.Item key={entry.id}>
                            <JournalEntryContainer entry={entry} role={role} />
                          </Timeline.Item>
                        ))
                      ) : (
                        <p>No entries for {entry.name}</p>
                      )}
                    </Timeline>
                    <hr />
                  </TabPane>
                );
              })}
            </Tabs>
          ) : (
            // if user is staff or admin, no tabs are shown as child selection is driven by selecting one child from a list
            <>
              {journal.map((entry) => {
                return (
                  <div key={entry.id}>
                    <h1>{entry.name}</h1>
                    <Timeline mode="alternate">
                      {entry.timeline.length ? (
                        entry.timeline.map((entry) => (
                          <Timeline.Item key={entry.id}>
                            <JournalEntryContainer entry={entry} role={role} />
                          </Timeline.Item>
                        ))
                      ) : (
                        <p>No entries for {entry.name}</p>
                      )}
                    </Timeline>
                    <hr />
                  </div>
                );
              })}
            </>
          )}
        </Layout>
      </div>
    </>
  );
};

export default Journal;
