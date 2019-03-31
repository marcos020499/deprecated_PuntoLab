// modules
import React, { Component } from 'react'

// utl
import tiposPaquetes from "./paquetes";
import formasPago from "../formasDePago";

export default class internetForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            costo: "1.00",
            netflix: "false",
            paquete: "0",
            tipoPago: "0"
        }
    }

    componentDidMount = () => {
        const { updateServiceData } = this.props;
        updateServiceData(this.state);
    }

    onChange = (e) => {
        const { updateServiceData } = this.props;
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            updateServiceData(this.state)
        });
    }
    
    render() {

        const { costo, netflix, paquete, tipoPago } = this.state;

        return (
            <div className='row'>
                <div className="col-sm-3">
                    <div className="form-group mb-4">
                        <select className="form-control form-control frm_field" value={paquete} onChange={this.onChange} name="paquete" required >
                            {
                                tiposPaquetes.map(paquete => {
                                    return <option key={paquete.id} value={paquete.id}>{paquete.nombre}</option>
                                })
                            }
                        </select>
                        <small className="form-text text-muted">Tipo de paquete</small>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group mb-4">
                        <input type="number" className="form-control form-control frm_field" value={costo} onChange={this.onChange} min="1" name="costo" required />
                        <small className="form-text text-muted">Costo de inst.</small>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group mb-4">
                        <select className="form-control form-control frm_field" value={netflix} onChange={this.onChange} name="netflix" required>
                            <option value="false">No</option>
                            <option value="true">Sí</option>
                        </select>
                        <small className="form-text text-muted">Netflix</small>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group mb-4">
                        <select className="form-control form-control frm_field" value={tipoPago} onChange={this.onChange} name="tipoPago" required >
                            {
                                formasPago.map(tipo => {
                                    return <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                })
                            }
                        </select>
                        <small className="form-text text-muted">Forma de pago</small>
                    </div>
                </div>
            </div>
        )
    }
}
