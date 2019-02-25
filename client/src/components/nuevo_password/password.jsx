// modules
import React, { Component } from 'react'

// components
import Card from "../card/card"

export default class password extends Component {
  render() {
    return (
        <Card>
            <div className="header">
                <div className="row">
                    <div className="col-sm-8">
                        <h2><span>Actualizar </span>contraseña</h2>
                    </div>
                    <div className="col-sm-4">
                        <button id="btn_send" className="btn btn-success">
                            <i className="material-icons"> backup </i> <span>Actualizar</span>
                        </button>
                    </div>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group mb-4">
                            <input type="password" className="form-control form-control frm_field" placeholder="Contraseña actual" name="password" required />
                            <small className="form-text text-muted">Para validad tu identidad</small>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group mb-4">
                            <input type="password" className="form-control form-control frm_field" placeholder="Nueva contraseña" name="new_password" />
                            <small className="form-text text-muted">Escribe una contraseña segura</small>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group mb-4">
                            <input type="password" className="form-control form-control frm_field" placeholder="Confirma la contraseña" name="new_password2" required />
                            <small className="form-text text-muted">Para impedir errores</small>
                        </div>
                    </div>
                </div>
            </form>
        </Card>
    )
  }
}
