// modules
import React, { Component } from 'react'

export default class camarasForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            camaras: "1",
            costo: "1.00",
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

        const { camaras, costo, tipoPago } = this.state;

        return (
            <div className='row'>
                <div className="col-sm-3">
                    <div className="form-group mb-4">
                        <input type="number" className="form-control form-control frm_field" min="1" value={camaras} name="camaras" required onChange={this.onChange}/>
                        <small className="form-text text-muted">Cámaras</small>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group mb-4">
                        <input type="number" className="form-control form-control frm_field" value={costo} name="costo" min="1" required onChange={this.onChange}/>
                        <small className="form-text text-muted">Costo de instalación</small>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="form-group mb-4">
                        <select className="form-control form-control frm_field" value={tipoPago} name="tipoPago" required onChange={this.onChange}>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                        <small className="form-text text-muted">Forma de pago</small>
                    </div>
                </div>
            </div>
        )
    }
}
