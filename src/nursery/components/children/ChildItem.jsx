import React from "react";
import {Card, List} from "antd";
import {EditOutlined, ReadOutlined} from '@ant-design/icons';

const ChildItem = ({id, firstName, image, surname}) => {
  return (
    <List.Item>
      <Card
        // style={{width: 300, borderRadius: '25px'}}
        cover={
          <img
            src={image}
            alt="child"
          />
        }
        actions={[
          <ReadOutlined key="journal"
            // onClick={() => history.push(`/child/${id}/journal/${today}`, { firstName })}
          />,
          <EditOutlined key="edit"
            // onClick={() => history.push(`/child/${id}/journal/${today}`, { firstName })}
          />
        ]}
        title={`${firstName} ${surname}`}
      >
      </Card>
    </List.Item>
  );
}

{/*<IonButton*/
}
{/*  onClick={() => history.push(`/child/${id}/journal/${today}`, { firstName })}>*/
}
{/*  {`${firstName} ${surname}`}*/
}
{/*</IonButton>*/
}
export default ChildItem;