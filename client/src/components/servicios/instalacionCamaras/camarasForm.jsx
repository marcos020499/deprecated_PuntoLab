// modules
import React, { Component } from 'react'
import { connect } from "react-redux";

// utl
import formasPago from "../formasDePago";

// redux
import { setServiceDetails } from "../../../redux/actions/servicioDetalleActions";

class camarasForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            camaras: "1",
            costo: "1.00",
            tipoPago: "0"
        }
    }

    // cuando se monta el componente se manda el estado inicial a redux
    componentDidMount() {
        this.props.setServiceDetails({
            data: this.state
        });
    }

    // si llegan propiedades signfica que se esta editando
    // entonces se iguala el estado actual
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

    // cada vez que un elemento cambia su valor se manda el estado actualizado a redux
    componentWillReceiveProps(props) {
        if (props.serviceData && props.serviceData.isEditing === true && props.serviceData.data) {
            const { camaras, costo, tipoPago } = props.serviceData.data;
            this.setState({
                costo,
                camaras,
                tipoPago
            })
        }
    }

    // cuando el componente se destruye se borra la info existente de redux
    componentWillUnmount() {
        this.props.setServiceDetails(null);
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

export default connect(mapStateToProps, mapDispatchToProps)(camarasForm);