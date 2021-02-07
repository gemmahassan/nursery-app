import React from "react";
import DatePicker from 'react-date-picker';

import moment from 'moment';

const JournalCalendar = () => {
  return (
    <div>
      <DatePicker
       isOpen={true}/>
    </div>
  );
};

export default JournalCalendar;
