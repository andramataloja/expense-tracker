import React from "react";
import Expenses from "./components/Expenses";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import history from "./utils/history";

const Routes = () => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/allexpenses" component={Expenses} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};
export default Routes;
