import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./public/Home";
import DashboardContainer from "./nursery/components/dashboard/DashboardContainer";
import NotFound from "./common/NotFound";
import RegisterContainer from "./public/signup/RegisterContainer";
import NurseryContactContainer from "./public/signup/NurseryContactContainer";
import NurseryListContainer from "./public/nurseries/NurseryListContainer";
import LoginContainer from "./public/login/LoginContainer";

// sets up routes for specific parts of the platform
// links path to component
// includes Not Found component for invalid link
const Routes = () => {
  return (
    <Switch>
      <Route path="/register" component={RegisterContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/dashboard" component={DashboardContainer} />
      <Route exact path="/contact" component={NurseryContactContainer} />
      <Route exact path="/nurseries" component={NurseryListContainer} />
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
