import React from "react";
import { Card, List } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { IonAlert } from "@ionic/react";

const Nurseries = ({
  handleClick,
  handleRemove,
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
        renderItem={(nursery) => (
          <List.Item>
            <Card
              actions={[
                <CloseCircleTwoTone
                  twoToneColor="#eb2f96"
                  key="delete"
                  onClick={() => handleClick(nursery)}
                />,
              ]}
              title={nursery.name}
            >
              {nursery.town}
            </Card>
          </List.Item>
        )}
      />

      {showConfirm && (
        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header={`Confirm delete`}
          message={`Do you want to delete this nursery?`}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "OK",
              handler: () => {
                handleRemove();
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default Nurseries;
