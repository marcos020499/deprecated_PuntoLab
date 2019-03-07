// assets
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

// Components
import Navbar from "../navbar/navbar"
import Menu from "../menu/menu";
import VerClientes from "../clientes/verClientes"
import CrearEditarCliente from "../clientes/crearEditarCliente"
import VerReportes from "../reportes/verReportes"
import CrearReporte from "../reportes/crearReporte"
import NewPassword from "../nuevo_password/password"
import NotFound from "../notFound/ContentNotFound"
import VerUsuarios from "../usuarios/listar";
import CrearEditarUsuarios from "../usuarios/crear"

export default class layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Menu />
        <Switch>
          <Route exact path="/clientes" component={VerClientes} />
          <Route exact path="/clientes/crear" component={CrearEditarCliente} />
          <Route exact path="/clientes/editar/:id" component={CrearEditarCliente} />
          <Route exact path="/reportes/ver" component={VerReportes} />
          <Route exact path="/reportes/crear" component={CrearReporte} />
          <Route exact path="/usuarios" component={VerUsuarios} />
          <Route exact path="/usuarios/crear" component={CrearEditarUsuarios} />
          <Route exact path="/usuarios/editar/:id" component={CrearEditarUsuarios} />
          <Route exact path="/password" component={NewPassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
