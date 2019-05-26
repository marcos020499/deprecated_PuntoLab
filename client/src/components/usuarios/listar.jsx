// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import alertify from 'alertifyjs';
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// components
import Card from "../card/card";

// usuarios
import tiposUsuario from "./tiposUsuario";

export default class listar extends Component {


    constructor(props) {
        super(props)
        
        this.state = {
            usuarios: []
        }
    }

    // cuando el componente se monta
    componentDidMount(){
        this.requestData();
    }

    // solicita los datos al servidor
    requestData() {

        axios.get(process.env.REACT_APP_SERVER_IP + "api/usuarios/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }
                
                const usuarios = res.data;
                console.log(usuarios);
                
                this.setState({ usuarios });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    // cuando se queire eliminar un usuario
    delete = (_id, nombre) => {
        alertify.prompt('Confirma la eliminación', 'Ingresa tu contraseña para eliminar a ' + nombre, '', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/usuarios/eliminar", { password: value, _id })
                .then(response => {
                    toast.info("Se eliminó el usuario");
                    this.requestData()
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        return toast.warn(`La contraseña es incorrecta.`)
                    } else if (err.response && err.response.status === 302) {
                        return toast.warn("No se puede eliminar al usuario porque tiene servicios relacionados")
                    } else if (err.response && err.response.status === 204) {
                        return toast.warn("No se econtró al usuario")
                    } else if (err.response && err.response.status === 304) {
                        return toast.warn("No se puede eliminar a todos los administradores")
                    }

                    return toast.error("No se pudo eliminar el cliente - " + err)
                })

        }, () => { }).set('type', 'password').set('labels', { ok: 'Aceptar', cancel: 'Cancelar' });
    }
    

    render() {

        const { usuarios } = this.state;
        
        return (
            <Card>
                <Helmet>
                    <title>Usuarios | {app_name}</title>
                </Helmet>
                <div className="header" style={{marginBottom: "0px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Usuarios </span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/usuarios/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Permisos</th>
                            <th scope="col">Pago servicios</th>
                            <th scope="col">Pagar</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(user => {
                                const { _id, nombre, usuario, permisos, pago } = user
                                const filteredUser = tiposUsuario.filter(item => item.id === permisos)[0]
                                
                                return(
                                    <tr key={_id}>
                                        <td>{nombre}</td>
                                        <td>{usuario}</td>
                                        <td>{filteredUser.descripcion}</td>
                                        <td>{filteredUser.id === 3 ? "$" + pago : null}</td>
                                        <td>{filteredUser.id === 3 ? <i className="material-icons">money_off</i> : null}</td>
                                        <td><Link to={"/usuarios/editar/" + _id}><i className="material-icons"> edit </i></Link></td>
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
