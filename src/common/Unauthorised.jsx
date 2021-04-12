import React from "react";
import {Alert} from "antd";

const Unauthorised = () => {
  return (
    <>
      <Alert
        message="Error"
        description="You do not have the correct permissions to view this page."
        type="error"
        showIcon
      />
    </>
  );
};

export default Unauthorised;
