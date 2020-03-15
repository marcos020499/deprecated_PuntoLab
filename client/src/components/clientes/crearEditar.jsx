// modules
import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound"

class crearCliente extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _id: undefined,
      nombre: undefined,
      telefono: undefined,
      direccion: undefined,
      ciudad: undefined,
      comunidad: undefined,
      isEditing: false,
      notFound: false,
    }
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    if (!id) {
      return;
    }

    this.setState({ isEditing: true })
    axios.get(process.env.REACT_APP_SERVER_IP + "api/clientes/detallar/" + id)
      .then(res => {
        const { _id, nombre, telefono, direccion, ciudad, comunidad } = res.data

        this.setState({
          _id,
          nombre,
          telefono,
          direccion,
          ciudad,
          comunidad
        });

      })
      .catch(err => {
        if (err.response.status === 404) {
          return this.setState({ notFound: true })
        }
        
        toast.warn("No se puede mostrar la información - " + err)
      })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { _id, nombre, telefono, direccion, ciudad, comunidad, isEditing } = this.state

    axios.post(process.env.REACT_APP_SERVER_IP + `api/clientes${isEditing ? "/editar" : "/nuevo"}`, { _id, nombre, telefono, direccion, ciudad, comunidad})
      .then(res => {
        toast.success(`Cliente ${isEditing ? "editado" : "creado"}`);
        this.props.history.push("/clientes");
      })
      .catch(err => toast.warn(`No se pudo ${isEditing ? "editar" : "crear"} el cliente - ${err}`))
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {

    const { nombre, telefono, direccion, ciudad, comunidad, isEditing, notFound } = this.state

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
                  isEditing ? <h2><span>Editar a </span>{nombre}</h2> : <h2><span>Crear </span>cliente</h2>
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
              <div className="col-sm-8">
                <div className="form-group mb-4">
                  <input onChange={this.onChange} value={nombre || ""} type="text" className="form-control form-control frm_field" placeholder="Nombre(s), Apellido Paterno, Apellido Materno" name="nombre"
                    required />
                  <small className="form-text text-muted">* Escribe el nombre del cliente</small>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group mb-4">
                  <input onChange={this.onChange} value={telefono || ""} type="text" className="form-control form-control frm_field" placeholder="Telefono" name="telefono" />
                  <small className="form-text text-muted">Número teléfonico del cliente</small>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="form-group mb-2">
                  <input onChange={this.onChange} value={direccion || ""} type="text" className="form-control form-control frm_field" placeholder="Dirección" name="direccion"
                    required />
                  <small className="form-text text-muted">* Dirección del cliente</small>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group mb-2">
                  <input onChange={this.onChange} value={ciudad || ""} type="text" className="form-control form-control frm_field" placeholder="Ciudad" name="ciudad"
                    required />
                  <small className="form-text text-muted">* Ciudad del cliente</small>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <input onChange={this.onChange} value={comunidad || ""} type="text" className="form-control form-control frm_field" placeholder="Comunidad" name="comunidad" />
                  <small className="form-text text-muted">Comunidad del cliente</small>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    )
  }
}

export default withRouter(
  crearCliente
);