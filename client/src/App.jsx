//modules
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Dashboard from "./components/dashboard/layout";
import Login from "./components/login/login"

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

// alertify
import "./components/alertify/index"

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route component={Dashboard} />
          </Switch>
        </BrowserRouter>
        <ToastContainer draggable={false} pauseOnHover={false} pauseOnFocusLoss={false} closeOnClick={false} />
      </div>
    );
  }
}

export default App;
