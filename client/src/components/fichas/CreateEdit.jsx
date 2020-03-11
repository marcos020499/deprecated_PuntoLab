import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound"

export default class CreateEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            _id: undefined,
            nombre: "", 
            cantidad: 0,
            prefijo: "",
            costo: 0,
            plan: "",
            vendidas: 0,
            total_cobrado: 0,
            comision: 5,
            ganancia_neta: 0,
            error: false,
            folio_error: "",
            isEditing: false,
            notFound: false
        }
    }

    onChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           [name]: value
       }, () => {
            if (name === "costo" || name === "vendidas" || name === "comision") {
                this.calculos();
            }
       });       
    }

    calculos = () => {
        const { costo, vendidas, comision } = this.state;

        if (Number.isNaN(costo) || Number.isNaN(vendidas)) {
            return;
        }

        const calculoTotal = costo * vendidas;
        const calculoComision = ((calculoTotal * comision) / 100);
        const calculoTotalNeto = calculoTotal - calculoComision;

        this.setState({
            total_cobrado: calculoTotal,
            ganancia_neta: calculoTotalNeto
        })
    }
    
    render() {

        const { nombre, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error, isEditing, notFound  } = this.state
    
        if (notFound) {
          return <NotFound/>
        }
    
        return (
          <Card>
            <Helmet>
              <title>{isEditing ? "Editar" : "Crear"} ficha | {app_name}</title>
            </Helmet>
            <form onSubmit={this.onSubmit}>
              <div className="header">
                <div className="row">
                  <div className="col-sm-8">
                    {
                      isEditing ? <h2><span>Editar a </span>{nombre}</h2> : <h2><span>Crear </span>ficha</h2>
                    }
                  </div>
                  <div className="col-sm-4">
                    <button type="submit" className="btn btn-success">
                      <i className="material-icons"> backup </i> <span>{isEditing ? "Guardar" : "Crear"}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='form-content'>
                <div className="row">
                  <div className="col-sm-5">
                    <div className="form-group mb-4">
                      <input onChange={this.onChange} value={nombre || ""} type="text" className="form-control form-control frm_field" placeholder="Nombre" name="nombre"
                        required />
                      <small className="form-text text-muted">* Escribe el nombre de la ficha</small>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group mb-2">
                      <input required onChange={this.onChange} value={cantidad || ""} type="number" className="form-control form-control frm_field" placeholder="$0.00" name="cantidad" />
                      <small className="form-text text-muted">* Cantidad entregada</small>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group mb-2">
                      <input onChange={this.onChange} value={prefijo || ""} type="text" className="form-control form-control frm_field" placeholder="Prefijo" name="prefijo"
                        required />
                      <small className="form-text text-muted">* Prefijo</small>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group mb-2">
                      <input onChange={this.onChange} value={costo || ""} type="number" className="form-control form-control frm_field" placeholder="0" name="costo"
                        required />
                      <small className="form-text text-muted">* Costo</small>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group mb-2">
                      <input required onChange={this.onChange} value={plan || ""} type="text" className="form-control form-control frm_field" placeholder="Plan" name="plan" />
                      <small className="form-text text-muted">* Plan</small>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group mb-2">
                      <input required onChange={this.onChange} value={vendidas || ""} type="number" className="form-control form-control frm_field" placeholder="0" name="vendidas" />
                      <small className="form-text text-muted">* Vendidas</small>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group mb-2">
                      <input disabled onChange={this.onChange} value={total_cobrado || ""} type="number" className="form-control form-control frm_field" placeholder="0.00" name="total_cobrado" />
                      <small className="form-text text-muted">Total cobrado</small>
                    </div>
                  </div>
                    <div className="col-sm-2">
                        <div className="form-group mb-2">
                            <select className="form-control form-control frm_field" value={comision} onChange={this.onChange} name="comision" required >
                                <option key="5" value="5">5%</option>
                                <option key="10" value="10">10%</option>
                                <option key="15" value="15">15%</option>
                            </select>
                            <small className="form-text text-muted">Técnico</small>
                        </div>
                    </div>
                  <div className="col-sm-2">
                    <div className="form-group mb-2">
                      <input disabled onChange={this.onChange} value={ganancia_neta || ""} type="number" className="form-control form-control frm_field" placeholder="0.00" name="ganancia_neta" />
                      <small className="form-text text-muted">Ganancia neta</small>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        )
    }
}
