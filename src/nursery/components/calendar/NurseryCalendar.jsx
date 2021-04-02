import React, {useEffect, useState} from 'react';
import {Calendar, Badge} from "antd";
import { IonContent } from '@ionic/react';
import moment from 'moment';
import CalendarDataService from "../../../services/calendar";
import '../../style.css';

const NurseryCalendar = ({dateCellRender}) => {
  return (
    <>
      <Calendar dateCellRender={dateCellRender}/>
    </>
  )
};

export default NurseryCalendar;