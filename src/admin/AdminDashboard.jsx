import React, {useEffect, useState} from "react";
import AuthService from '../services/auth';
import NurseryDataService from '../services/nursery';
import {Button, Card, List} from "antd";
import {CheckOutlined, CloseOutlined, SettingOutlined} from "@ant-design/icons";
import http from '../shared/http-common';

const AdminDashboard = props => {
  // const currentUser = AuthService.getCurrentUser();
  const [nurseries, setNurseries] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    NurseryDataService.getAllPending()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleApprove = nursery => {
    const name = 'person';
    const email = nursery.email;
    const subject = 'Nursery Journal - complete registration';
    const message = `Hi, to complete your Nursery Journal registration for ${nursery.name}, click the link below http://localhost:8081/signup/${nursery.id}`;

    http.post("/send", {
      name,
      email,
      subject,
      message
    }).then(res => {
      alert(res)
    }).catch(err => {
      console.log(err)
    })

    NurseryDataService.approve(nursery.id)
      .then(
        response => {
          console.log(response.data);
        })
      .catch(e => {
          const resMessage =
            (e.response &&
              e.response.data &&
              e.response.data.message) ||
            e.message ||
            e.toString();
        }
      );
  };

  const handleDecline = nursery => {
    const name = 'person';
    const email = nursery.email;
    const subject = 'Nursery Journal - registration declined';
    const message = `Hi, your application for registration of ${nursery.name} can not be completed at this time.`;

    http.post("/send", {
      name,
      email,
      subject,
      message
    }).then(res => {
      alert(res)
    }).catch(err => {
      console.log(err)
    })

    NurseryDataService.delete(nursery.id)
      .then(
        response => {
          console.log(response.data);
        })
      .catch(e => {
          const resMessage =
            (e.response &&
              e.response.data &&
              e.response.data.message) ||
            e.message ||
            e.toString();
        }
      );
  };

  return (
    <>
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={nurseries}
      renderItem={nursery => (
        <List.Item>
          <Card
            actions={[
              <CheckOutlined
                key="check"
                onClick={() => handleApprove(nursery)}/>,
              <CloseOutlined
                key="delete"
                onClick={() => handleDecline(nursery)}/>,
            ]}
            title={nursery.name}
          >{nursery.town}</Card>
        </List.Item>
      )}
    />
  </>
  );
};

export default AdminDashboard;
