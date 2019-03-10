// modules
import React, { Component } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { connect } from "react-redux";

// components
import Card from "../card/card"

class password extends Component {

    constructor(props) {
        super(props)

        this.state = {
            old_password: "",
            new_password: "",
            conf_password: ""
        }
    }

    onChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           [name]: value
       });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { old_password, new_password, conf_password } = this.state;
        const { _id } = this.props.session.user;
    
        if (new_password !== conf_password) {
            return toast.warn("Las contraseñas no coinciden");
        }

        axios.post(process.env.REACT_APP_SERVER_IP + "api/password/new", { _id, old_password, new_password })
            .then(data => {
                this.setState({
                    old_password: "",
                    new_password: "",
                    conf_password: ""
                })
                return toast.success("Se cambió tu contraseña");
            })
            .catch(err => {
                if (err.response.status === 400) {
                    return toast.warn("La contraseña actual es incorrecta");
                }
                return toast.warn("No se pudo cambiar tu contraseña - " + err);
            })
    }
    

    render() {

        const { old_password, new_password, conf_password } = this.state;

        return (
            <Card>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>Cambiar </span>contraseña</h2>
                            </div>
                            <div className="col-sm-4">
                                <button id="btn_send" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>Actualizar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={old_password} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Contraseña actual" name="old_password" required />
                                    <small className="form-text text-muted">Para validad tu identidad</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={new_password} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Nueva contraseña" name="new_password" required/>
                                    <small className="form-text text-muted">Escribe la nueva contraseña</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={conf_password} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Confirma la contraseña" name="conf_password" required />
                                    <small className="form-text text-muted">Repite la contraseña</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}


const mapStateToProps = (state) => {

    const { session } = state;

    return {
        session
    }
}

export default connect(mapStateToProps)(password);