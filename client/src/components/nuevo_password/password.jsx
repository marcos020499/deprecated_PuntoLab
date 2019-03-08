// modules
import React, { Component } from 'react'

// components
import Card from "../card/card"

export default class password extends Component {

    constructor(props) {
        super(props)

        this.state = {
            old_password: undefined,
            new_password: undefined,
            conf_password: undefined
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

        console.log(this.state);
    
        if (new_password !== conf_password) {
            // no coinciden
            return;
        }

        // enviar
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
                                    <input value={old_password || ""} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Contraseña actual" name="old_password" required />
                                    <small className="form-text text-muted">Para validad tu identidad</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={new_password || ""} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Nueva contraseña" name="new_password" required/>
                                    <small className="form-text text-muted">Escribe la nueva contraseña</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input value={conf_password || ""} onChange={this.onChange} type="password" className="form-control form-control frm_field" placeholder="Confirma la contraseña" name="conf_password" required />
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
