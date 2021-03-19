import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import StaffList from "./staff/components/StaffList";
import NurseryList from "./public/NurseryList";
import Home from "./public/Home";
import NurseryHome from "./public/NurseryHome";
import ChildList from "./nursery/components/children/ChildList";
import Journal from "./nursery/components/journal/Journal";
import AddEntry from "./nursery/components/journal/AddEntry";
import EditEntry from "./nursery/components/journal/EditEntry";
import Login from "./nursery/components/Login";
import Profile from "./nursery/components/Profile";
import DashboardContainer from "./nursery/components/dashboard/DashboardContainer";
import NurserySignup from "./public/signup/NurserySignup";
import NurseryCalendar from "./nursery/NurseryCalendar";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/staff" component={StaffList} />
        <Route exact path="/nurseries" component={NurseryList} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={NurserySignup} />
        <Route exact path="/nurseries/:nurseryId" component={NurseryHome} />
        <Route exact path="/nurseries/:nurseryId/children" component={ChildList} />
        <Route exact path="/nurseries/:nurseryId/journal/add" component={AddEntry} />
        <Route exact path="/child/:childId/journal/:journalId/edit" component={EditEntry} />
        <Route exact path="/child/:childId/journal/:date" component={Journal} />
        <Route exact path="/nursery/:nurseryId/calendar" component={NurseryCalendar} />

      </Switch>
    </Router>
  );
};

export default Routes;
