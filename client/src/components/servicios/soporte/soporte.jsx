import React, { Component } from 'react'

import { connect } from "react-redux";

// redux
import { setServiceDetails } from "../../../redux/actions/servicioDetalleActions";

class soporte extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            problema: ""
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
    componentWillReceiveProps(props) {
        if (props.serviceData && props.serviceData.isEditing === true && props.serviceData.data) {
            const { problema } = props.serviceData.data;
            this.setState({
                problema
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

        const { problema } = this.state;

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className="form-group mb-4">
                        <input type="text" className="form-control form-control frm_field" required value={problema} name="problema" onChange={this.onChange} />
                        <small className="form-text text-muted">Falla</small>
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

export default connect(mapStateToProps, mapDispatchToProps)(soporte);