// modules
import React, { Component } from 'react'

// components
import Card from "../card/card";
import serviciosList from "./servicios.json";

export default class servicios extends Component {
    render() {
        return (
            <Card>
                <form action="">
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>Agregar </span>text</h2>
                            </div>
                            <div className="col-sm-4">
                                <button id="btn_send" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>Guardar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='form-content'>
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="form-group mb-4">
                                <input type="text" className="form-control form-control frm_field" placeholder="Nombre completo" />
                                <small className="form-text text-muted">Busqueda por nombre</small>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group mb-4">
                                <select name="servicio" className="form-control form-control frm_field" required>
                                    {
                                        serviciosList.servicios.map(servicio => {
                                            return(
                                                <option key={servicio.id} value={servicio.id}>{ servicio.descripcion }</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="form-text text-muted">Tipo de servicio</small>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group mb-4">
                                <input disabled type="text" className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Número teléfonico</small>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group mb-4">
                                <input disabled type="text" className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Dirección</small>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group mb-4">
                                <input disabled type="text" className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Localidad / Ciudad</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
