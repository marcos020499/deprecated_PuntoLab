// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";

// components
import Card from "../card/card";

export default class servicios extends Component {
    render() {
        return (
            <Card>
                <div className="header" style={{ marginBottom: "0px" }}>
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Servicios </span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/servicios/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Vencimiento</th>
                            <th scope="col">Falla</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Visita</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11/10/2019</td>
                            <td>Formatear computadora</td>
                            <td>Jaral del Progreso</td>
                            <td><a href="/reporte_status.html"><i className="material-icons"> home </i></a></td>
                            <td><a href="/reporte_add.html"><i className="material-icons"> edit </i></a></td>
                            <td><i className="material-icons"> delete </i> </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}
