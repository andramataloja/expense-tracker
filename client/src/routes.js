import React from "react";
import { Router, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};
export default Routes;
