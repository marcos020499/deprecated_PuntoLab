// modules
import React, { Component } from 'react'

// components
import Card from "../card/card";

export default class verClientes extends Component {
  render() {
    return (
      <Card>
            <div className="header">
                <div className="row">
                    <div className="col-sm-8">
                        <h2><span>Clientes </span></h2>
                    </div>
                    <div className="col-sm-4">
                        <a href="/cliente_add.html" className="btn btn-success">
                            <i className="material-icons"> add </i> <span>Agregar</span>
                        </a>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Brenda Jessica Arroyo</td>
                        <td>4561000000</td>
                        <td>Calle de Jaral Nº3</td>
                        <td>Jaral del Progreso</td>
                        <td><a href="/cliente_add.html"><i className="material-icons"> edit </i></a></td>
                        <td><i className="material-icons"> delete </i></td>
                    </tr>
                </tbody>
            </table>
      </Card>
    )
  }
}
