import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import StaffList from "./staff/components/StaffList";
import NurseryList from "./nursery/components/NurseryList";
import Home from "./public/Home";
import NurseryHome from "./nursery/components/NurseryHome";
import ChildList from "./nursery/components/children/ChildList";
import Journal from "./nursery/components/journal/Journal";


const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/staff" component={StaffList} />
        <Route exact path="/nurseries" component={NurseryList} />
        {/*<Route path="/signup" component={NurserySignup} />*/}
        <Route exact path="/nurseries/:nurseryId" component={NurseryHome} />
        <Route exact path="/nurseries/:nurseryId/children" component={ChildList} />
        <Route exact path="/child/:childId/journal" component={Journal} />
      </Switch>
    </Router>
  );
};

export default Routes;
