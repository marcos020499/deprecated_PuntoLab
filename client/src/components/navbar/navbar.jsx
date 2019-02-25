// assets
import "./styles.css"

// modules
import React, { Component } from 'react'

export default class navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">Dashboard</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            PuntoLab
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }
}
