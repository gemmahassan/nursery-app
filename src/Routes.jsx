import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import history from "./history";
import NurseryList from "./public/NurseryList";
import Home from "./public/Home";
import Login from "./common/Login";
import DashboardContainer from "./nursery/components/dashboard/DashboardContainer";
import NurseryContact from "./public/signup/NurseryContact";
import Register from "./public/signup/Register";
import NotFound from "./common/NotFound";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={DashboardContainer}/>
        <Route exact path="/contact" component={NurseryContact}/>
        <Route exact path="/nurseries" component={NurseryList}/>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
