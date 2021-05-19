import React, { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import CalendarDataService from "../../../services/calendar";
import "../../style.css";
import NurseryCalendar from "./NurseryCalendar";

// NOT IMPLEMENTED
const NurseryCalendarContainer = ({ nurseryId, nurseryName }) => {
  const [entries, setEntries] = useState();

  // call API to get calendar entries for specific nursery
  useEffect(() => {
    CalendarDataService.getAllCalendarEntries(nurseryId)
      .then((response) => setEntries(response.data))
      .catch((e) => console.log(e));
  }, []);

  // if there are no entries display nothing
  if (!entries) return null;

  return (
    <>
      <Button
        disabled={!entries}
        type="primary"
        icon={<DownloadOutlined />}
        size={"large"}
      >
        Download
      </Button>
      <NurseryCalendar />
    </>
  );
};

export default NurseryCalendarContainer;
