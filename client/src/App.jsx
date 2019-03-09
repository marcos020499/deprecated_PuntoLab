//modules
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/store"
import axios from "axios";
import jwt_decode from "jwt-decode"

// components
import Dashboard from "./components/dashboard/layout";
import Login from "./components/login/login"
import PrivateRoute from "./components/common/privateRoute"

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

// alertify
import "./components/alertify/index"

// redux
import { setCurrentUser, removeCurrentUser } from "./redux/actions/sessionActions";

// validar la sesión al actualizar la pagina
if (localStorage.jwtToken) {
  try {

    // se manda el contenido del token a redux
    // y se crea una sesion temporal
    const decoded = jwt_decode(localStorage.jwtToken);
    Store.dispatch(setCurrentUser(decoded));

    // se manda el token a validar al servidor
    axios.post(process.env.REACT_APP_SERVER_IP + "api/token/validate", { token: localStorage.jwtToken })
      .then(response => {
        if (!response.data && !response.data._id) {
          return; 
        }

        // se actualizan los datos del usuario en el storage
        Store.dispatch(setCurrentUser(response.data));
      })
      .catch(err => {
        // si el servidor retorna un estado diferente de 200
        // la sesion no es valida, la eliminamos
        Store.dispatch(removeCurrentUser());
      })
  } catch (error) {
    console.log("Decoded error");
  }
}

class App extends Component {

  render() {

    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute component={Dashboard} />
          </Switch>
        </BrowserRouter>
        <ToastContainer draggable={false} pauseOnHover={false} pauseOnFocusLoss={false} closeOnClick={false} />
      </Provider>
    );
  }
}

export default App;
