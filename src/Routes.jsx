import React, {useEffect, useState} from "react";
import {Link, Router, Switch, Route} from "react-router-dom";
import history from "./history";
import StaffList from "./nursery/components/staff/StaffList";
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
import NurseryCalendar from "./nursery/NurseryCalendar";
import NurseryDataService from "./services/nursery";
import NurseryContact from "./public/signup/NurseryContact";
import NurserySignup from "./nursery/NurserySignup";
import Dashboard from "./admin/Dashboard";

const Routes = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = () => {
    NurseryDataService.getAllPending()
      .then(response => {
        setNurseries(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Router history={history}>
      {/*generate a signup page for each of the registered nurseries based on their unique url*/}
      <Route exact path={`/signup/:nurseryId`} component={NurserySignup}/>

      <Route path="/" exact component={Home}/>
      <Route path="/staff" component={StaffList}/>
      <Route path="/admin" component={Dashboard}/>
      {/*<Route exact path="/admin" component={NurseryApproval}/>*/}
      <Route exact path="/nurseries" component={NurseryList}/>
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={DashboardContainer}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/contact" component={NurseryContact}/>
      <Route exact path="/nurseries/:nurseryId" component={NurseryHome}/>
      <Route exact path="/nurseries/:nurseryId/children" component={ChildList}/>
      <Route exact path="/nurseries/:nurseryId/journal/add" component={AddEntry}/>
      <Route exact path="/child/:childId/journal/:journalId/edit" component={EditEntry}/>
      <Route exact path="/child/:childId/journal/:date" component={Journal}/>
      {/*<Route exact path="/signup/:url" component={NurserySignup}/>*/}
      <Route exact path="/nursery/:nurseryId/calendar" component={NurseryCalendar}/>

      {/*generate a route for each of the registered nurseries based on their unique url*/}
      {nurseries.map(nursery => (
        <Route exact path={`/login/${nursery.id}`} component={Login}/>
      ))}
      {/*<Route render={() => <h1>404: page not found</h1>} />*/}
    </Router>
  );
};

export default Routes;
