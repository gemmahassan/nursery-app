import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import {IonContent} from "@ionic/react";
import { Col, Row } from 'antd';
import NurseryItem from "./NurseryItem";
import Map from "./Map";
import Nav from "./Nav";

const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = () => {
    NurseryDataService.getAllConfirmed()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  console.log(nurseries);

  return (
    <>
      <Nav/>
      <IonContent>
        <div className="nursery-list-wrapper">
          <h1>Our Nurseries</h1>
          <Row gutter={16}>
            {nurseries && nurseries.map(nursery => (
            <Col span={6} key={nursery.id}>
              <NurseryItem
                id={nursery.id}
                image={nursery.image}
                name={nursery.name}
                town={nursery.town}
              />
            </Col>
            ))}
          </Row>
        <Map nurseries={nurseries} />
        </div>
      </IonContent>
    </>
  );
};

export default NurseryList;
