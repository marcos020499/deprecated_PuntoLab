// modules
import React, { Component } from 'react'
import axios from "axios";

// components
import Card from "../card/card";

export default class crearCliente extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nombre: undefined,
      telefono: undefined,
      direccion: undefined,
      ciudad: undefined,
      comunidad: undefined
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nombre, telefono, direccion, ciudad, comunidad } = this.state

    axios.post(process.env.REACT_APP_SERVER_IP + "api/clientes/nuevo", { nombre, telefono, direccion, ciudad, comunidad})
      .then(res => {
        this.setState({
          nombre: undefined,
          telefono: undefined,
          direccion: undefined,
          ciudad: undefined,
          comunidad: undefined
        });
        console.log(res);
        // if 201 ok
      })
      .catch(err => {
        // no se pudo crear
        console.log(err.response);
      })
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {

    const { nombre, telefono, direccion, ciudad, comunidad } = this.state

    return (
      <Card>
        <form onSubmit={this.onSubmit}>
          <div className="header">
            <div className="row">
              <div className="col-sm-8">
                <h2><span>Crear </span>cliente nuevo</h2>
              </div>
              <div className="col-sm-4">
                <button type="submit" className="btn btn-success">
                  <i className="material-icons"> backup </i> <span>Crear</span>
                </button>
              </div>
            </div>
          </div>
          <div className='form-content'>
            <div className="row">
              <div className="col-sm-8">
                <div className="form-group mb-4">
                  <input onChange={this.onChange} value={nombre || ""} type="text" className="form-control form-control frm_field" placeholder="Nombre completo" name="nombre"
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
                <div className="form-group mb-4">
                  <input onChange={this.onChange} value={direccion || ""} type="text" className="form-control form-control frm_field" placeholder="Dirección" name="direccion"
                    required />
                  <small className="form-text text-muted">* Dirección del cliente</small>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group mb-4">
                  <input onChange={this.onChange} value={ciudad || ""} type="text" className="form-control form-control frm_field" placeholder="Ciudad" name="ciudad"
                    required />
                  <small className="form-text text-muted">* Ciudad del cliente</small>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group mb-4">
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
