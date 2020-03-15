import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import alertify from 'alertifyjs';

// components
import Card from "../card/card";

class pv extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            pvs: []
        }
    }

    // cuando el componente se monta
    componentDidMount(){
        this.requestData();
    }

     // solicita los datos al servidor
     requestData() {

        axios.get(process.env.REACT_APP_SERVER_IP + "api/pv/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                this.setState({ pvs: res.data });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    delete = (_id, nombre) => {
        const { permisos } = this.props.session.user;

        alertify.prompt('Confirma la eliminación', `Ingresa ${permisos === 0 ? "tu contraseña" : "una contraseña de administrador"} para eliminar a ${nombre}`, '', (evt, value) => {
            
            axios.post(process.env.REACT_APP_SERVER_IP + "api/pv/eliminar", { password: value, _id })
                .then(response => {
                    toast.info(`Se eliminó el pv${permisos === 0 ? "." : " con autorización de " + response.data.admin}`);
                    this.requestData();
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        return toast.warn(`La contraseña${permisos === 0 ? "" : " de administrador" } es incorrecta.`)
                    } else if (err.response && err.response.status === 302) {
                        return toast.error("No se puede eliminar el PV porque tiene fichas relacionadas")
                    }
                    return toast.error("No se pudo eliminar el pv - " + err)
                })

        }, () => { }).set('type', 'password').set('labels', { ok: 'Aceptar', cancel: 'Cancelar' });
    }

    render() {
        return (
            <Card>
                <Helmet>
                    <title>Punto de venta | {app_name}</title>
                </Helmet>
                <div className="header" style={{marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Punto de venta</span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/puntodeventa/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Localidad</th>
                            <th scope="col">Antena</th>
                            <th scope="col">Enlace</th>
                            <th scope="col">Router</th>
                            <th scope="col">IP</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.pvs.map(pv => {
                                const { _id, nombre, localidad, antena, enlace, router, ip } = pv
                                return (
                                    <tr key={_id}>
                                        <td>{nombre}</td>
                                        <td>{localidad}</td>
                                        <td>{antena}</td>
                                        <td>{enlace}</td>
                                        <td>{router}</td>
                                        <td>{ip}</td>
                                        <td><Link to={"/puntodeventa/editar/" + _id}><i className="material-icons"> edit </i></Link></td>
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

const mapStateToProps = (state) => {

    const { session } = state;

    return {
        session
    }
}

export default connect(mapStateToProps)(pv);