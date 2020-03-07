import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import axios from "axios";
import { toast } from "react-toastify";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound";

export default class pv_editar_crear extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            _id: undefined,
            nombre: undefined,
            localidad: undefined,
            antena: undefined,
            enlace: undefined,
            router: undefined,
            ip: undefined,
            isEditing: false,
            notFound: false,
        }
    }

    componentDidMount(){

        const id = this.props.match.params.id
    
        if (!id) {
          return;
        }
    
        this.setState({ isEditing: true })
        axios.get(process.env.REACT_APP_SERVER_IP + "api/pv/detallar/" + id)
          .then(res => {
                const { _id, nombre, localidad, antena, enlace, router, ip } = res.data
        
                this.setState({
                    _id,
                    nombre,
                    localidad,
                    antena,
                    enlace,
                    router,
                    ip
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

    onSubmit = (e) => {
        e.preventDefault();

        const { isEditing } = this.state;
    
        axios.post(process.env.REACT_APP_SERVER_IP + `api/pv${isEditing ? "/editaro" : "/nuevo"}`, this.state)
          .then(res => {
                toast.success(`PV ${isEditing ? "editado" : "creado"}`);
                this.props.history.push("/puntodeventa");
          })
          .catch(err => toast.warn(`No se pudo ${isEditing ? "editar" : "crear"} el PV - ${err}`))
      }

    render() {
        const { nombre, localidad, antena, enlace, router, ip, isEditing, notFound } = this.state

        if (notFound) {
            return <NotFound/>
        }

        return (
            <Card>
                <Helmet>
                    <title>{isEditing ? "Editar" : "Crear"} cliente | {app_name}</title>
                </Helmet>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                        <div className="col-sm-8">
                            {
                            isEditing ? <h2><span>Editar a </span>{nombre}</h2> : <h2><span>Crear </span>pv</h2>
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
                            <div className="col-sm-6">
                                <div className="form-group mb-4">
                                <input onChange={this.onChange} value={nombre || ""} type="text" className="form-control form-control frm_field" placeholder="Nombre" name="nombre"
                                    required />
                                <small className="form-text text-muted">* Escribe el nombre</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group mb-4">
                                <input onChange={this.onChange} value={localidad || ""} type="text" className="form-control form-control frm_field" placeholder="Localidad" name="localidad" required/>
                                <small className="form-text text-muted">* Localidad</small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group mb-2">
                                <input onChange={this.onChange} value={antena || ""} type="text" className="form-control form-control frm_field" placeholder="Antena" name="antena"
                                    required />
                                <small className="form-text text-muted">* Antena</small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group mb-2">
                                <input onChange={this.onChange} value={enlace || ""} type="text" className="form-control form-control frm_field" placeholder="Enlace" name="enlace"
                                    required />
                                <small className="form-text text-muted">* Enlace</small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group mb-2">
                                <input onChange={this.onChange} value={router || ""} type="text" className="form-control form-control frm_field" placeholder="Router" name="router" />
                                <small className="form-text text-muted">* Router</small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group mb-2">
                                <input onChange={this.onChange} value={ip || ""} type="text" className="form-control form-control frm_field" placeholder="IP" name="ip" required />
                                <small className="form-text text-muted">* IP</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}
