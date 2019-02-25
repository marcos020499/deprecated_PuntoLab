// modules
import React, { Component } from 'react'

// components
import Card from "../card/card";

export default class crearReporte extends Component {
  render() {
    return (
        <Card>
            <div className="header">
                <div className="row">
                    <div className="col-sm-8">
                        <h2><span>Crear </span>reporte de servicio</h2>
                    </div>
                    <div className="col-sm-4">
                        <button id="btn_send" className="btn btn-success">
                            <i className="material-icons"> backup </i> <span>Guardar</span>
                        </button>
                    </div>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group mb-4">
                            <input type="text" className="form-control form-control frm_field" placeholder="Nombre completo" />
                            <small className="form-text text-muted">Busca el nombre del cliente</small>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group mb-4">
                            <input disabled type="text" className="form-control form-control frm_field" />
                            <small className="form-text text-muted">Número teléfonico</small>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="form-group mb-4">
                            <input disabled type="text" className="form-control form-control frm_field" />
                            <small className="form-text text-muted">Dirección</small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-4">
                            <input disabled type="text" className="form-control form-control frm_field" />
                            <small className="form-text text-muted">Ciudad</small>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group mb-4">
                            <input disabled type="text" className="form-control form-control frm_field" />
                            <small className="form-text text-muted">Comunidad</small>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="form-group mb-4">
                                    <textarea required style={{ height: "125px" }} className="form-control form-control frm_field" placeholder="Falla" name="descripcion"></textarea>
                                    <small className="form-text text-muted">Escribe una descripción de la falla</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group mb-4">
                                            <input type="date" className="form-control form-control frm_field" name="fecha" required />
                                            <small className="form-text text-muted">Fecha de vencimiento</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <select class="custom-select">
                                            <option selected disabled>Técnico</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Card>
    )
  }
}
