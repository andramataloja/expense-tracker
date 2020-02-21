import React from "react"
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';

import history from './utils/history'

const Routes = () => {
      return(
        <Router history={history}>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path='/allexpenses' component={Expenses} />
            <Route exact path='/addexpense' component={AddExpense} />
            <Route exact path='/editexpense/:eid' component={EditExpense} />
          </Switch>
        </React.Fragment>
      </Router>
  )}

export default Routes;