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

// rutas con permisos
import ProtectedRoute from "../common/protectedRoute";

export default class layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Menu />
        <Switch>
          <ProtectedRoute permisos={[0, 1]} exact path="/clientes" component={VerClientes} />
          <ProtectedRoute permisos={[0, 1]} exact path="/clientes/crear" component={CrearEditarCliente} />
          <ProtectedRoute permisos={[0, 1]} exact path="/clientes/editar/:id" component={CrearEditarCliente} />
          <ProtectedRoute permisos={[0, 1, 2]} exact path="/reportes/ver" component={VerReportes} />
          <ProtectedRoute permisos={[0, 1]} exact path="/reportes/crear" component={CrearReporte} />
          <ProtectedRoute permisos={[0]} exact path="/usuarios" component={VerUsuarios} />
          <ProtectedRoute permisos={[0]} exact path="/usuarios/crear" component={CrearEditarUsuarios} />
          <ProtectedRoute permisos={[0]} exact path="/usuarios/editar/:id" component={CrearEditarUsuarios} />
          <ProtectedRoute permisos={[0, 1, 2]} exact path="/password" component={NewPassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
