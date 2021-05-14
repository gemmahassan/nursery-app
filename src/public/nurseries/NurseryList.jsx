import React from "react";
import { IonContent } from "@ionic/react";
import { Col, Row } from "antd";
import NurseryItem from "./NurseryItem";
import Nav from "../Nav";
import MapContainer from "../map/MapContainer";

const NurseryList = ({ nurseries }) => {
  return (
    <>
      <Nav />
      <IonContent>
        <div className="nursery-list-wrapper">
          <h1>Our Nurseries</h1>
          <Row gutter={16}>
            {nurseries &&
              nurseries.map((nursery) => (
                <Col xs={24} sm={12} md={6} lg={6} xl={6} key={nursery.id}>
                  <NurseryItem
                    id={nursery.id}
                    image={nursery.image}
                    name={nursery.name}
                    town={nursery.town}
                  />
                </Col>
              ))}
          </Row>
          <MapContainer nurseries={nurseries} />
        </div>
      </IonContent>
    </>
  );
};

export default NurseryList;
