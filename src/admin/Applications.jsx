import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import {Button, Card, List} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {IonAlert} from "@ionic/react";

const Applications = () => {
  const [nurseries, setNurseries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});
  const [action, setAction] = useState('');

  useEffect(() => {
    NurseryDataService.getAllPending()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [nurseries.length]);

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

  const confirmApprove = () => {
    // console.log(currentNursery);
    // const name = 'person';
    // const email = currentNursery.email;
    // const subject = 'Nursery Journal - complete registration';
    // const message = `Hi, to complete your Nursery Journal registration for ${currentNursery.name}, click the link below http://localhost:8081/signup/${currentNursery.id}`;
    //
    // http.post("/send", {
    //   name,
    //   email,
    //   subject,
    //   message
    // }).then(res => {
    //   alert(res)
    // }).catch(err => {
    //   console.log(err)
    // })

    //approve nursery
    //create staff member u user using contact name, associate with nurseryser using contact name, associate with nursery
    //
    NurseryDataService.approve(currentNursery.id)
      .then(
        response => {
          // StaffDataService.create({
          //   first_name: currentNursery.contactName,
          //   surname: currentNursery.contactName,
          //   email: currentNursery.email,
          //   nursery_id: currentNursery.id
          // })
          //   .then(response => {
          //     const staffId = response.data.id;
          //     UserDataService.create({
          //       email: currentNursery.email,
          //       role: 'admin'
          //     })
          //       .then(response => {
          //         StaffDataService.update({
          //           'userId': response.data.id,
          //           staffId
          //         })
          //           .then(response => {
          //             console.log("finished");
          //           })
          //           .catch(e => {
          //             console.log(e);
          //           })
          //       })
          //       .catch(e => {
          //         console.log(e);
          //       })
          //   })
          //   .catch(e => {
          //     console.log(e);
          //   })
        })
      .catch(e => {
        console.log(e);
      })
  };

  const confirmDecline = nursery => {
    // const name = 'person';
    // const email = currentNursery.email;
    // const subject = 'Nursery Journal - registration declined';
    // const message = `Hi, your application for registration of ${currentNursery.name} can not be completed at this time.`;
    //
    // http.post("/send", {
    //   name,
    //   email,
    //   subject,
    //   message
    // }).then(res => {
    //   alert(res)
    // }).catch(err => {
    //   console.log(err)
    // })

    NurseryDataService.delete(currentNursery.id)
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
