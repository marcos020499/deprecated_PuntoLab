// modules
import React, { Component } from 'react'

// components
import Card from "../card/card";

export default class crearCliente extends Component {
  render() {
    return (
      <Card>
        <div className="header">
          <div className="row">
            <div className="col-sm-8">
              <h2><span>Crear </span>cliente nuevo</h2>
            </div>
            <div className="col-sm-4">
              <button id="btn_send" className="btn btn-success">
                <i className="material-icons"> backup </i> <span>Crear</span>
              </button>
            </div>
          </div>
        </div>
        <form>
          <div className="row">
            <div className="col-sm-8">
              <div className="form-group mb-4">
                <input type="text" className="form-control form-control frm_field" placeholder="Nombre completo" name="nombre"
                  required />
                <small className="form-text text-muted">* Escribe el nombre del cliente</small>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group mb-4">
                <input type="text" className="form-control form-control frm_field" placeholder="Telefono" name="telefono" />
                <small className="form-text text-muted">Número teléfonico del cliente</small>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="form-group mb-4">
                <input type="text" className="form-control form-control frm_field" placeholder="Dirección" name="direccion"
                  required />
                <small className="form-text text-muted">* Dirección del cliente</small>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group mb-4">
                <input type="text" className="form-control form-control frm_field" placeholder="Ciudad" name="ciudad"
                  required />
                <small className="form-text text-muted">* Ciudad del cliente</small>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group mb-4">
                <input type="text" className="form-control form-control frm_field" placeholder="Comunidad" name="comunidad" />
                <small className="form-text text-muted">Comunidad del cliente</small>
              </div>
            </div>
          </div>
        </form>
      </Card>
    )
  }
}
