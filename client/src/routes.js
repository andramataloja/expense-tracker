import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import history from "./utils/history";

const Routes = () => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};
export default Routes;
