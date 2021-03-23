import React, {useEffect, useState} from "react";
import AuthService from '../services/auth';
import NurseryDataService from '../services/nursery';
import {Button, Card, List} from "antd";
import {IonModal} from "@ionic/react";
import {CheckOutlined, CloseOutlined, SettingOutlined} from "@ant-design/icons";

const Dashboard = props => {
  // const currentUser = AuthService.getCurrentUser();
  const [nurseries, setNurseries] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});
  useEffect(() => {
    NurseryDataService.getAllPending()
      .then(response => {
        setNurseries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [])

  // if (currentUser.role === 'superadmin') {
  //   setAdmin(true);
  // }


  console.log(currentNursery);
  return (
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
        renderItem={item => (
          <List.Item>
            <Card
              actions={[
                <CheckOutlined
                  key="check" />,
                <CloseOutlined key="delete" />,
              ]}
              title={item.name}
            >{item.town}</Card>
          </List.Item>
        )}
      />
  );
};

export default Dashboard;
