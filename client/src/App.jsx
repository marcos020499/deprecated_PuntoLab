import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard/layout";
import Login from "./components/login/login"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
