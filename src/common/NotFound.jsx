import React from "react";
import {Alert} from "antd";

const Warning = () => {
  return (
    <>
      <Alert
        message="Error"
        description="Page not found."
        type="error"
        showIcon
      />
    </>
  );
};

export default Warning;
