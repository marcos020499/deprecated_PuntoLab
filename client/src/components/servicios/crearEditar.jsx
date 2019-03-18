// modules
import React, { Component } from 'react'

// components
import Card from "../card/card";
import serviciosList from "./servicios.json";
import Suggestions from "./suggestions/clientes";

export default class servicios extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            cliente: undefined,
            servicio: 0
        }
    }

    updateCliente = (cliente) => {
        this.setState({ cliente });
    }

    seleccionarServicio = (e) => {
        this.setState({ servicio: e.target.value })
    }

    render() {

        const { cliente, servicio } = this.state;

        return (
            <Card>
                <form>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>Nuevo </span>servicio</h2>
                            </div>
                            <div className="col-sm-4">
                                <button id="btn_send" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>Guardar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="form-group mb-4">
                                    <Suggestions updateCliente={this.updateCliente} updateClientesStatus={this.updateClientesStatus} />
                                    <small className="form-text text-muted">Busqueda por nombre</small>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-4">
                                    <select onChange={this.seleccionarServicio} name="servicio" className="form-control form-control frm_field" required>
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
                                <div className="form-group mb-2">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.telefono ? cliente.telefono : "") : ""} />
                                    <small className="form-text text-muted">Número teléfonico</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-2">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.direccion ? cliente.direccion : "") : ""}/>
                                    <small className="form-text text-muted">Dirección</small>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-2">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.comunidad ? cliente.comunidad + ", " + cliente.ciudad : cliente.ciudad) : "" } />
                                    <small className="form-text text-muted">Localidad / Ciudad</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Formulario {serviciosList.servicios[servicio].descripcion} (pendiente)</h4>
                    </div>
                </form>
            </Card>
        )
    }
}
