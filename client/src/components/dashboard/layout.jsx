// assets
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

// Components
import Navbar from "../navbar/navbar"
import Menu from "../menu/menu";
import VerClientes from "../clientes/verClientes"
import CrearCliente from "../clientes/crearCliente"
import VerReportes from "../reportes/verReportes"
import CrearReporte from "../reportes/crearReporte"
import NewPassword from "../nuevo_password/password"
import NotFound from "../notFound/notFound"

export default class layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Menu />
        <Switch>
          <Route exact path="/clientes/ver" component={VerClientes} />
          <Route exact path="/clientes/crear" component={CrearCliente} />
          <Route exact path="/reportes/ver" component={VerReportes} />
          <Route exact path="/reportes/crear" component={CrearReporte} />
          <Route exact path="/password" component={NewPassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
