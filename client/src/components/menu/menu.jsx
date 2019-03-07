// assets
import logo from "./logo.png"
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class menu extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         selected: ""
      }
    }

    onClick = (item) => {

        this.setState({
            selected: item
        })
    }

    render() {

        const { selected } = this.state

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
                        <li onClick={() => this.onClick("Clientes")} >
                            <Link to="/clientes" className={selected === "Clientes" ? "selected" : ""}>
                                <i className="material-icons"> people </i>
                                <span className="menu-title">Clientes</span>
                            </Link>
                        </li>
                        <li onClick={() => this.onClick("")}>
                            <Link to="/reportes/ver">
                                <i className="material-icons"> label_important </i>
                                <span className="menu-title">* Ver reportes</span>
                            </Link>
                        </li>
                        <li onClick={() => this.onClick("")}>
                            <Link to="/reportes/crear">
                                <i className="material-icons"> label_important </i>
                                <span className="menu-title">* Crear reporte</span>
                            </Link>
                        </li>
                    </div>
                    <li className="nav-header">Configuración</li>
                    <li onClick={() => this.onClick("Usuarios")}>
                        <Link to="/usuarios" className={selected === "Usuarios" ? "selected" : ""}>
                            <i className="material-icons"> people_outline </i>
                            <span className="menu-title">Usuarios</span>
                        </Link>
                    </li>
                    <li onClick={() => this.onClick("")}>
                        <Link to="/password">
                            <i className="material-icons"> security </i>
                            <span className="menu-title">* Cambiar contraseña</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}
