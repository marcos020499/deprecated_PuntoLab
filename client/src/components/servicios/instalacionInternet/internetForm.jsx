// modules
import React, { Component } from 'react'
import { connect } from "react-redux";

// utl
import tiposPaquetes from "./paquetes";
import formasPago from "../formasDePago";

// redux
import { setServiceDetails } from "../../../redux/actions/servicioDetalleActions";

class internetForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            costo: "1.00",
            netflix: "false",
            paquete: "0",
            tipoPago: "0"
        }
    }

    // cuando se monta el componente se manda el estado inicial a redux
    componentDidMount(){
        this.props.setServiceDetails({
            data: this.state
        });
    }

    // si llegan propiedades signfica que se esta editando
    // entonces se iguala el estado actual
    componentWillReceiveProps(props){
        if (props.serviceData && props.serviceData.isEditing === true && props.serviceData.data) {
            const { costo, netflix, paquete, tipoPago } = props.serviceData.data;
            this.setState({
                costo,
                netflix,
                paquete,
                tipoPago
            })
        }
    }

    // cada vez que un elemento cambia su valor se manda el estado actualizado a redux
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.props.setServiceDetails({
                data: this.state
            });
        });
    }

    // cuando el componente se destruye se borra la info existente de redux
    componentWillUnmount() {
        this.props.setServiceDetails(null);
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


const mapStateToProps = (state) => {
    const { serviceDetails } = state;
    return {
        serviceData: serviceDetails
    };
}

const mapDispatchToProps = {
    setServiceDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(internetForm);