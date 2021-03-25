import React, {useEffect, useState} from "react";
import NurseryDataService from '../services/nursery';
import {Card, List} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";

const Nurseries = () => {
  // const currentUser = AuthService.getCurrentUser();
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    NurseryDataService.getAllConfirmed()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleRemove = nursery => {
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
                <CloseOutlined
                  key="delete"
                  onClick={() => handleRemove(nursery)}/>
              ]}
              title={nursery.name}
            >{nursery.town}</Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Nurseries;
