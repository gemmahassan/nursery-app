import React from "react";
import {Card, List} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {IonAlert} from "@ionic/react";

const Applications = ({
                        action,
                        handleClick,
                        handleConfirm,
                        nurseries,
                        setShowConfirm,
                        showConfirm
                      }) => {
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
