// assets
import logo from "./logo.png"
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class menu extends Component {
  render() {
    return (
        <div className="main-menu">
            <ul>
                <div className="profile">
                    <img src={logo} alt="logo" />
                    <p>BIENVENIDO</p>
                    <h6>Username</h6>
                </div>
                <div>
                    <li className="nav-header">Menú principal</li>
                    <li>
                        <Link to="/clientes/ver">
                            <i className="material-icons"> people </i>
                            <span className="menu-title">Clientes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reportes/ver">
                            <i className="material-icons"> label_important </i>
                            <span className="menu-title">Ver reportes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reportes/crear">
                            <i className="material-icons"> label_important </i>
                            <span className="menu-title">Crear reporte</span>
                        </Link>
                    </li>
                </div>
                <li className="nav-header">Configuración</li>
                <li>
                    <Link to="/password">
                        <i className="material-icons"> security </i>
                        <span className="menu-title">Cambiar contraseña</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
  }
}
