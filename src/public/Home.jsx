import React from "react";
import {IonContent} from '@ionic/react';
import {Button, Carousel, Row, Col} from 'antd';
import {UserAddOutlined, SecurityScanFilled, GiftFilled, SmileFilled, HeartFilled} from '@ant-design/icons';
import Nav from "./Nav";
import First from './images/1.jpg';
import Second from './images/2.jpeg';
import Third from './images/3.jpeg';
import Fourth from './images/4.jpeg';
import './styles.css';
import history from "../history";
import CookieConsent from "react-cookie-consent";

const Home = () => {
  return (
    <>
      <Nav/>
      <IonContent>
        <Carousel autoplay effect="fade">
          <div>
            <img src={First}/>
          </div>
          <div>
            <img src={Second}/>
          </div>
          <div>
            <img src={Third}/>
          </div>
          <div>
            <img src={Fourth}/>
          </div>
        </Carousel>
        <div className={'action-wrapper'}>
          <Row align={'center'}>
            <Col span={24}>
              <Button type="secondary" shape="round" icon={<UserAddOutlined/>} size={'large'}
                      onClick={() => history.push('/contact')}>
                Register
              </Button>
            </Col>
          </Row>
        </div>
        <div className={'points-wrapper'}>
          <Row justify="space-around">
            <Col span={4}>
              <SecurityScanFilled style={{ fontSize: '48px' }} />
              <h2>Protect</h2>
            </Col>
            <Col span={4}>
              <GiftFilled style={{ fontSize: '48px' }} />
              <h2>Nurture</h2>
            </Col>
            <Col span={4}>
              <SmileFilled style={{ fontSize: '48px' }} />
              <h2>Teach</h2>
            </Col>
            <Col span={4}>
              <HeartFilled style={{ fontSize: '48px' }} />
              <h2>Care</h2>
            </Col>
          </Row>
        </div>
        <footer className={'footer'}>
          <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        </footer>
      </IonContent>
    </>
  );
};

export default Home;
