import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import { Link } from "react-router-dom";

// components
import Card from "../card/card";

export default class fichas extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fichas: []
        }
    }

    delete = (id) => {

    }
    
    render() {

        const { fichas } = this.state;
        return (
            <Card>
                <Helmet>
                    <title>Fichas | {app_name}</title>
                </Helmet>
                <div className="header" style={{marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Fichas</span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/fichas/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Prefijo</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Vendidas</th>
                            <th scope="col">Total cobrado</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            fichas.map(cliente => {
                                const { _id, nombre, cantidad, prefijo, costo, vendidas, total_cobrado } = cliente
                                return (
                                    <tr key={_id}>
                                        <td>{nombre}</td>
                                        <td>{cantidad}</td>
                                        <td>{prefijo}</td>
                                        <td>{costo}</td>
                                        <td>{vendidas}</td>
                                        <td>{total_cobrado}</td>
                                        <td><Link to={"/clientes/editar/" + _id}><i className="material-icons"> edit </i></Link></td>
                                        <td onClick={() => this.delete(_id)}><i className="material-icons"> delete </i></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tbody>
                    </tbody>
                </table>
            </Card>
        )
    }
}
