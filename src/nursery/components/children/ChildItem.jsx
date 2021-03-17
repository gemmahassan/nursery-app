import React from "react";
import {Card} from "antd";
import { ReadOutlined } from '@ant-design/icons';

const ChildItem = ({id, firstName, image, surname}) => {

  return (
    <li key={id}>
      <Card
        style={{width: 300, borderRadius: '25px'}}
        cover={
          <img
            src={image}
            alt="child"
          />
        }
        actions={[
          <ReadOutlined key="journal"/>
        ]}
        title={`${firstName} ${surname}`}
      >
      </Card>
    </li>
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