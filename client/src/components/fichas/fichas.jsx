import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import { Link } from "react-router-dom";
import axios from "axios";
import alertify from 'alertifyjs';
import { toast } from "react-toastify";
import { connect } from "react-redux";

// components
import Card from "../card/card";

class fichas extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fichas: []
        }
    }

    delete = (_id) => {
        const { permisos } = this.props.session.user;

        alertify.prompt('Confirma la eliminación', `Ingresa ${permisos === 0 ? "tu contraseña" : "una contraseña de administrador"} para eliminar la ficha`, '', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/fichas/eliminar", { password: value, _id })
                .then(response => {
                    toast.info(`Se eliminó la ficha${permisos === 0 ? "." : " con autorización de " + response.data.admin}`);
                    this.requestData();
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        return toast.warn(`La contraseña${permisos === 0 ? "" : " de administrador"} es incorrecta.`)
                    }
                    
                    return toast.error("No se pudo eliminar la ficha - " + err)
                })

        }, () => { }).set('type', 'password').set('labels', { ok: 'Aceptar', cancel: 'Cancelar' });
    }

    // solicita los datos al servidor
    requestData() {

        axios.get(process.env.REACT_APP_SERVER_IP + "api/fichas/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                this.setState({ fichas: res.data });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    // cuando el componente se monta
    componentDidMount() {
        this.requestData();
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
                            <th scope="col">Vendidas</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Total</th>
                            <th scope="col">Comisión</th>
                            <th scope="col">Neto</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            fichas.map(ficha => {
                                const { _id, pv, cantidad, prefijo, costo, vendidas, comision, ganancia_neta, total_cobrado } = ficha
                                return (
                                    <tr key={_id}>
                                        <td>{pv.nombre}</td>
                                        <td>{cantidad}</td>
                                        <td>{prefijo}</td>
                                        <td>{vendidas}</td>
                                        <td>${costo}</td>
                                        <td>${total_cobrado}</td>
                                        <td>{comision}%</td>
                                        <td>${ganancia_neta}</td>
                                        <td><Link to={"/fichas/editar/" + _id}><i className="material-icons"> edit </i></Link></td>
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

const mapStateToProps = (state) => {

    const { session } = state;

    return {
        session
    }
}

export default connect(mapStateToProps)(fichas);