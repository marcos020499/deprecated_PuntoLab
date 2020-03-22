import React, { Component } from 'react';
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import axios from "axios";
import "./styles.css";
import alertify from 'alertifyjs';
import { Link } from "react-router-dom";

// components
import Card from "../card/card";

export default class list extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            internet: []
        }
    }

    componentDidMount() {
        this.requestData();
    }

    // solicita los datos al servidor
    requestData() {

        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/internet/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }
                
                const usuarios = res.data;
                this.setState({ internet: usuarios });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    changeStatus(_id, activo) {
        const status = activo ? "SUSPENDIDO" : "ACTIVO";
        alertify.confirm('Confirma el cambio', 'Se cambiará el estado a ' + status + ', ¿Está seguro?', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/internet/change_status", { _id })
                .then(response => {
                    if (response.status === 200) {

                        const item = this.state.internet.map(item => {
                            if (item._id === _id) {
                                item.internetActivo = !item.internetActivo;
                                return item;
                            }

                            return item;
                        })

                        this.setState({ internet: item });
                        return toast.info("Se actualizó el status.");
                    }
                })
                .catch(err => {
                    return toast.error("No se pudo cambiar el status - " + err)
                })

        }, () => { }).set('labels', { ok: 'Aceptar', cancel: 'Cancelar' });
    }
    
    render() {

        const { internet } = this.state;
        
        return (
            <Card>
                <Helmet>
                    <title>Usuarios | {app_name}</title>
                </Helmet>
                <div className="header" style={{marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Usuarios de Internet </span></h2>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Comunidad</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Ver</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Cambiar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            internet.map(data => {
                                const { _id, internetActivo } = data
                                const { nombre, telefono, direccion, comunidad, ciudad } = data.servicio.cliente
                                
                                return(
                                    <tr key={_id}>
                                        <td>{nombre}</td>
                                        <td>{telefono}</td>
                                        <td>{direccion}</td>
                                        <td>{comunidad}</td>
                                        <td>{ciudad}</td>
                                        <td><Link to={"/servicios/0/ver/" + data.servicio._id}><i className="material-icons"> remove_red_eye </i></Link></td>
                                        <td><i className={`material-icons statusIcon internet ${internetActivo ? "in" : "ac"}`}> { internetActivo ? "check" : "cancel" } </i></td>
                                        <td onClick={() => this.changeStatus(_id, internetActivo)}><i className="material-icons"> refresh </i></td>
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
