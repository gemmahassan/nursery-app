import React from "react";
import { Alert, Card, List } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { IonAlert } from "@ionic/react";

// renders a list of pending nurseries with options to accept or decline
const Applications = ({
  action,
  duplicateUsername,
  handleClick,
  handleConfirm,
  nurseries,
  setShowConfirm,
  showConfirm,
}) => {
  return (
    <div style={{ margin: "20px" }}>
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
        // display a card for each nursery in the nurseries array
        // include actions to approve or decline
        renderItem={(nursery) => (
          <List.Item>
            <Card
              actions={[
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  key="approve"
                  onClick={() => handleClick(nursery, "approve")}
                />,
                <CloseCircleTwoTone
                  twoToneColor="#eb2f96"
                  key="decline"
                  onClick={() => handleClick(nursery, "decline")}
                />,
              ]}
              title={nursery.name}
            >
              {nursery.town}
            </Card>
          </List.Item>
        )}
      />

      {/*confirm user selection*/}
      {showConfirm && (
        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header={`Confirm ${action}`}
          message={`Do you want to ${action} this nursery?`}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "OK",
              handler: () => {
                handleConfirm();
              },
            },
          ]}
        />
      )}

      {/*if the username of the nursery admin already exists, prompt the admin to contact the nursery */}
      {duplicateUsername && (
        <Alert
          message="This username already exists. Please contact the nursery to resolve"
          type="error"
        />
      )}
    </div>
  );
};

export default Applications;
