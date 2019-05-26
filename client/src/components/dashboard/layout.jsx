// assets
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

// Components
import Navbar from "../navbar/navbar"
import Menu from "../menu/menu";

import VerClientes from "../clientes/listar"
import CrearEditarCliente from "../clientes/crearEditar"

import VerServicios from "../servicios/listar";
import CrearEditarServicios from "../servicios/crearEditar";
import DetalleServicioInternet from "../servicios/instalacionInternet/detalle";
import DetalleServicioCamaras from "../servicios/instalacionCamaras/detalle";
import DetalleServicioSoporte from "../servicios/soporte/detalle";

import ServicioInternetVisita from "../servicios/instalacionInternet/visitaTecnico";
import ServicioCamarasVisita from "../servicios/instalacionCamaras/visitaTecnico";
import ServicioSoporteVisita from "../servicios/soporte/visitaTecnico";

import VerUsuarios from "../usuarios/listar";
import CrearEditarUsuarios from "../usuarios/crearEditar";
import NewPassword from "../nuevo_password/password"
import NotFound from "../notFound/ContentNotFound"

// rutas con permisos
import ProtectedRoute from "../common/protectedRoute";

export default class layout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Menu />
                <Switch>
                    {/* Clientes */}
                    <ProtectedRoute permisos={[0, 1]} exact path="/clientes" component={VerClientes} />
                    <ProtectedRoute permisos={[0, 1]} exact path="/clientes/crear" component={CrearEditarCliente} />
                    <ProtectedRoute permisos={[0, 1]} exact path="/clientes/editar/:id" component={CrearEditarCliente} />

                    {/* Servicios */}
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios" component={VerServicios} />
                    <ProtectedRoute permisos={[0, 1]} exact path="/servicios/crear" component={CrearEditarServicios} />
                    <ProtectedRoute permisos={[0, 1]} exact path="/servicios/editar/:id" component={CrearEditarServicios} />
                    
                    {/* Ver detalle de los servicios */}
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/0/ver/:id" component={DetalleServicioInternet} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/1/ver/:id" component={DetalleServicioCamaras} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/2/ver/:id" component={DetalleServicioSoporte} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/3/ver/:id" component={DetalleServicioSoporte} />

                    {/* Finalizar servicios */}
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/0/visita/:id" component={ServicioInternetVisita} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/1/visita/:id" component={ServicioCamarasVisita} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/2/visita/:id" component={ServicioSoporteVisita} />
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/servicios/3/visita/:id" component={ServicioSoporteVisita} />
                    
                    {/* Usuarios */}
                    <ProtectedRoute permisos={[0]} exact path="/usuarios" component={VerUsuarios} />
                    <ProtectedRoute permisos={[0]} exact path="/usuarios/crear" component={CrearEditarUsuarios} />
                    <ProtectedRoute permisos={[0]} exact path="/usuarios/editar/:id" component={CrearEditarUsuarios} />
                    
                    {/* Configuracion */}
                    <ProtectedRoute permisos={[0, 1, 2, 3]} exact path="/password" component={NewPassword} />
                    
                    {/* Utl */}
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}
