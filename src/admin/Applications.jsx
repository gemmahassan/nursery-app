import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import UserDataService from '../services/user';
import {Card, List} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {IonAlert} from "@ionic/react";
import http from '../shared/http-common';

const Applications = () => {
  const [nurseries, setNurseries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});
  const [action, setAction] = useState('');
  const [approveSuccess, setApproveSuccess] = useState(false);

  const getPendingNurseries = () => {
    NurseryDataService.getAllPending()
      .then(response => setNurseries(response.data))
      .catch(e => console.log(e));
  };

  const confirmApprove = () => {
    UserDataService.create({
      first_name: currentNursery.contact_first_name,
      surname: currentNursery.contact_surname,
      email: currentNursery.email,
      nursery_id: currentNursery.id,
      role: 'admin',
    })
      .then(response => {
        const nurseryName = currentNursery.name;
        const firstName = currentNursery.contact_first_name;
        const surname = currentNursery.contact_surname;
        const email = currentNursery.email;
        const token = response.data.token;
        const subject = 'Nursery Journal - Registration complete!';
        const message = `Hi ${firstName}, your registration for ${nurseryName} is nearly complete!
                                  Please click on the link below to create a password anc complete your registration
                                  http://localhost:8001/register?token=${token}`;
        NurseryDataService.approve(currentNursery.id)
          .then(
            response => {
              http.post("/send", {
                firstName,
                surname,
                email,
                subject,
                message
              }).then(() => {
                setApproveSuccess(true);
              }).catch(err => {
                console.log(err)
              })
            })
          .catch(e => {
            console.log(e);
          })
      });
  };

  const confirmDecline = () => {
    const firstName = currentNursery.contact_first_name;
    const surname = currentNursery.contact_surname;
    const email = currentNursery.email;
    const subject = 'Nursery Journal - registration declined';
    const message = `Hi ${firstName}, your application for registration of ${currentNursery.name} can not be completed at this time.`;

    NurseryDataService.delete(currentNursery.id)
      .then(
        response => {
          http.post("/send", {
            firstName,
            surname,
            email,
            subject,
            message
          }).then(res => {
            alert(res)
          }).catch(err => {
            console.log(err)
          })
        })
      .catch(e => {
          console.log(e);
        }
      );
  };

  const handleClick = (nursery, action) => {
    setCurrentNursery(nursery);
    setAction(action);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    switch (action) {
      case 'approve':
        confirmApprove();
        return;
      case 'decline':
        confirmDecline();
        return;
    }
  };

  useEffect(() => {
    getPendingNurseries();
  }, [nurseries.length]);

  useEffect(() => {
    if (approveSuccess) {
      getPendingNurseries();
    }
  }, [approveSuccess]);

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
                  key="approve"
                  onClick={() => handleClick(nursery, 'approve')}/>,
                <CloseOutlined
                  key="decline"
                  onClick={() => handleClick(nursery, 'decline')}/>,
              ]}
              title={nursery.name}
            >{nursery.town}</Card>
          </List.Item>
        )}
      />

      {showConfirm &&
      <IonAlert
        isOpen={showConfirm}
        onDidDismiss={() => setShowConfirm(false)}
        header={`Confirm ${action}`}
        message={`Do you want to ${action} this nursery?`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'OK',
            handler: () => {
              handleConfirm();
            }
          }
        ]}
      />
      }
    </>
  );
};

export default Applications;
