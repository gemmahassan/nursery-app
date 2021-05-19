import React from "react";
import history from "../history";
import { Button, Result } from "antd";

// renders a 404 Not Found page with a button to redirect user to homepage
const NotFound = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => history.push("/")} type="primary">
            Back Home
          </Button>
        }
      />
      ,
    </>
  );
};

export default NotFound;
