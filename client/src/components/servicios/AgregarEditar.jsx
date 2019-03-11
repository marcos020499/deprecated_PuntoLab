// modules
import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound";

class AgregarEditar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: undefined,
            nombre: "",
            isEditing: false,
            notFound: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { _id, nombre, isEditing } = this.state;

        axios.post(process.env.REACT_APP_SERVER_IP + `api/servicios${isEditing ? "/editar" : "/nuevo"}`, { _id, nombre })
            .then(res => {
                toast.success(`Se ${isEditing ? "editó" : "creó"} el servicio`);
                this.props.history.push("/servicios");
            })
            .catch(err => {
                if (err.response.status === 409) {
                    return toast.warn("Ya existe el servicio")
                }
                toast.warn(`No se pudo ${isEditing ? "editar" : "crear"} el servicio - ${err}`)
            })
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        if (!id) {
          return;
        }

        this.setState({ isEditing: true })
        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/detallar/" + id)
            .then(res => {
                const { _id, nombre } = res.data

                this.setState({
                    _id,
                    nombre
                });

            })
            .catch(err => {
                if (err.response.status === 404) {
                    return this.setState({ notFound: true })
                }

                return toast.warn("No se puede mostrar la información - " + err)
            })

    }

    onChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           [name]: value
       });
    }

    render() {

        const { nombre, notFound, isEditing } = this.state;

        if (notFound) {
          return <NotFound />;
        }

        return (
            <Card>
                <Helmet>
                    <title>{isEditing ? "Editar" : "Crear"} servicio | {app_name}</title>
                </Helmet>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                {
                                    isEditing ? <h2><span>Editar servicio </span>{nombre}</h2> : <h2><span>Crear </span>servicio</h2>
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
                                <div className="form-group mb-2">
                                    <input onChange={this.onChange} value={nombre} type="text" className="form-control form-control frm_field" placeholder="Descripción" name="nombre"
                                        required />
                                    <small className="form-text text-muted">* Nombre del servicio</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}

export default withRouter(AgregarEditar);