import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import StaffList from "./staff/components/StaffList";
import NurseryList from "./nursery/components/NurseryList";
import Home from "./pages/Home";
import history from "./history";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/staff" component={StaffList} />
        <Route path="/nurseries" component={NurseryList} />
      </Switch>
    </Router>
  );
};

export default Routes;
