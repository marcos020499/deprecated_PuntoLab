// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import alertify from "alertifyjs";

// components
import Card from "../card/card";

export default class servicios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            servicios: []
        }
    }

    requestData(){
        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                this.setState({ servicios: res.data });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    componentDidMount(){
        this.requestData();
    }

    // cuando se pide eliminar un servicio
    delete = (_id, nombre) => {

        alertify.prompt('Confirma la eliminación', `Ingresa tu contraseñapara eliminar ${nombre}`, '', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/eliminar", { password: value, _id })
                .then(response => {
                    toast.info("Se eliminó el servicio");
                    this.requestData()
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        return toast.warn("La contraseña es incorrecta.")
                    }

                    return toast.error("No se pudo eliminar el servicio - " + err)
                })

        }, () => { }).set('type', 'password');
    }

    render() {

        const { servicios } = this.state;

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
                            <th scope="col">Nombre</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicios.map(servicio => {
                                const { _id, nombre } = servicio;
                                return (
                                    <tr key={_id}>
                                        <td>{nombre}</td>
                                        <td><Link to={"/servicios/editar/" + _id}><i className="material-icons"> edit </i></Link></td>
                                        <td onClick={() => this.delete(_id, nombre)}><i className="material-icons"> delete </i></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Card>
        )
    }
}