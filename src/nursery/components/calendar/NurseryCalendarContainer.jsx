import React, { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import CalendarDataService from "../../../services/calendar";
import "../../style.css";
import NurseryCalendar from "./NurseryCalendar";
import { ics } from "./lib/ical.js";

const NurseryCalendarContainer = ({ nurseryId, nurseryName }) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    CalendarDataService.getAllCalendarEntries(nurseryId)
      .then((response) => setEntries(response.data))
      .catch((e) => console.log(e));
  }, []);

  if (!entries) return null;

  const getListData = (value) => {
    const givenDate = value.format("YYYY-MM-DD");
    const matchingEntries = entries.filter(
      (entry) => moment(entry.date).format("YYYY-MM-DD") === givenDate
    );
    if (matchingEntries.length) {
      return matchingEntries.map((entry) => {
        return { type: "success", content: entry.description };
      });
    }
    return [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  // add each of the calendar entries to an ics file
  // make the ics available for download
  const downloadCalendar = () => {
    const cal = ics();
    entries.forEach((entry) => {
      cal.addEvent(
        entry.description,
        `${nurseryName} Event`,
        nurseryName,
        entry.date,
        entry.date
      );
    });
    cal.download(`${nurseryName}_NurseryEvents`);
  };

  return (
    <>
      <Button
        disabled={!entries}
        type="primary"
        icon={<DownloadOutlined />}
        size={"large"}
        onClick={downloadCalendar}
      >
        Download
      </Button>
      <NurseryCalendar dateCellRender={dateCellRender} />
    </>
  );
};

export default NurseryCalendarContainer;
