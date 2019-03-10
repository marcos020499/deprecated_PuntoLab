import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound"

class crear extends Component {


    constructor(props) {
        super(props)

        this.state = {
            _id: undefined,
            nombre: undefined,
            usuario: undefined,
            password: undefined,
            permisos: 0,
            isEditing: false,
            notFound: false
        }
    }

    // genera una nueva contraseña
    newPassword = () => {
        this.setState({ password: Math.random().toString(36).substr(2, 8) })
    }

    // cuando se monta el componente
    componentDidMount(){
        const id = this.props.match.params.id

        if (!id) {
            this.newPassword();
            return;
        }

        this.setState({ isEditing: true })
        axios.get(process.env.REACT_APP_SERVER_IP + "api/usuarios/detallar/" + id)
            .then(res => {
                const { _id, nombre, usuario, permisos } = res.data

                this.setState({
                    _id,
                    nombre,
                    usuario,
                    permisos
                });

            })
            .catch(err => {
                if (err.response.status === 404) {
                    return this.setState({ notFound: true })
                }

                toast.warn("No se puede mostrar la información - " + err)
            })
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    // enviar el formulario con ajax
    onSubmit = (e) => {
        e.preventDefault();

        const { _id, nombre, usuario, password, permisos, isEditing } = this.state

        axios.post(process.env.REACT_APP_SERVER_IP + `api/usuarios${isEditing ? "/editar" : "/nuevo"}`, { _id, nombre, usuario, password, permisos })
            .then(res => {
                toast.success(`Se ${isEditing ? "editó" : "creó"} el usuario ` + usuario);
                this.props.history.push("/usuarios");
            })
            .catch(err => {
                if (err.response.status === 409) {
                    return toast.warn("Ya existe el nombre de usuario " + usuario)
                }
                toast.warn(`No se pudo ${isEditing ? "editar" : "crear"} el usuario - ${err}`)
            })
    }

    render() {

        const { nombre, usuario, password, permisos, isEditing, notFound } = this.state

        if (notFound) {
            return <NotFound />
        }

        return (
            <Card>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                {
                                    isEditing ? <h2><span>Editar a </span>{nombre}</h2> : <h2><span>Crear </span>usuario</h2>
                                }
                            </div>
                            <div className="col-sm-4">
                                <button type="submit" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>{isEditing ? "Guardar" : "Crear"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group mb-4">
                                    <input maxLength="35" onChange={this.onChange} value={nombre || ""} type="text" className="form-control form-control frm_field" placeholder="Nombre completo" name="nombre"
                                        required />
                                    <small className="form-text text-muted">* Escribe el nombre del usuario</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input maxLength="20" onChange={this.onChange} value={usuario || ""} type="text" required className="form-control form-control frm_field" placeholder="Nombre de usuario" name="usuario" />
                                    <small className="form-text text-muted">* Números y letras</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={password || "SIN CAMBIOS"} style={{ width: "auto", display: "inline" }} disabled type="text" required className="form-control form-control frm_field" name="password" />
                                    <button onClick={this.newPassword} style={{ marginTop: "-3px", border: "none" }} type="button" className="btn btn-primary">{isEditing ? "Reiniciar" : "Generar"}</button>
                                    <small className="form-text text-muted">Contraseña generada automáticamente</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <select onChange={this.onChange} name="permisos" className="form-control form-control frm_field" required value={permisos}>
                                        <option value="0">Administrador</option>
                                        <option value="1">Asistente</option>
                                        <option value="2">Técnico</option>
                                    </select>
                                    <small className="form-text text-muted">* Permisos para el usuario</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}

export default withRouter(crear);