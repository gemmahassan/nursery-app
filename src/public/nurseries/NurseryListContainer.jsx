import React, { useEffect, useState } from "react";
import NurseryDataService from "../../services/nursery";
import { IonContent } from "@ionic/react";
import { Col, Row } from "antd";
import NurseryItem from "./NurseryItem";
import Nav from "../Nav";
import MapContainer from "../map/MapContainer";
import NurseryList from "./NurseryList";

const NurseryListContainer = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = () => {
    NurseryDataService.getAllConfirmed()
      .then((response) => setNurseries(response.data))
      .catch((e) => console.log(e));
  };

  return <NurseryList nurseries={nurseries} />;
};

export default NurseryListContainer;
