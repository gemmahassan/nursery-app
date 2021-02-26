import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import StaffList from "./staff/components/StaffList";
import NurseryList from "./nursery/components/NurseryList";
import Home from "./public/Home";
import NurseryHome from "./nursery/components/NurseryHome";
import ChildList from "./nursery/components/children/ChildList";
import Journal from "./nursery/components/journal/Journal";
import AddEntry from "./nursery/components/journal/AddEntry";
import EditEntry from "./nursery/components/journal/EditEntry";

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
        <Route exact path="/nurseries/:nurseryId/journal/add" component={AddEntry} />
        <Route exact path="/child/:childId/journal/:journalId/edit" component={EditEntry} />
        <Route exact path="/child/:childId/journal/:date" component={Journal} />
      </Switch>
    </Router>
  );
};

export default Routes;
