import React from "react";
import { Card } from "antd";

// display a list of nurseries
const NurseryItem = ({ id, image, name, town }) => {
  const { Meta } = Card;
  return (
    <Card
      key={id}
      style={{ marginBottom: 20 }}
      cover={<img alt={name} src={image} />}
    >
      <Meta title={name} description={town} />
    </Card>
  );
};

export default NurseryItem;
