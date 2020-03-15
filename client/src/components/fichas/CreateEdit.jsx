import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import axios from "axios";
import { toast } from "react-toastify";
import Suggestions from "./suggestions";

// components
import Card from "../card/card";
import NotFound from "../notFound/ContentNotFound"

export default class CreateEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            _id: undefined,
            pv: undefined,
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

    componentDidMount() {

        const id = this.props.match.params.id

        if (!id) {
            return;
        }

        this.setState({ isEditing: true })
        axios.get(process.env.REACT_APP_SERVER_IP + "api/fichas/detallar/" + id)
            .then(res => {
                const { _id, pv, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error } = res.data

                this.setState({
                    _id, pv, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error
                });
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return this.setState({ notFound: true })
                }

                toast.warn("No se puede mostrar la información - " + err)
            })
    }

    // actualiza el nombre en el estado de acuerdo a los
    // datos que vienen del componente de sugerencias
    updatePV = (pv) => {
        this.setState({ pv });
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

    onSubmit = (e) => {
        e.preventDefault();

        const { _id, pv, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error, isEditing } = this.state

        if(!pv) {
            return toast.warn("Completa el campo de nombre");
        }

        axios.post(process.env.REACT_APP_SERVER_IP + `api/fichas${isEditing ? "/editar" : "/nuevo"}`, { _id, pv: pv._id, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error })
            .then(res => {
                toast.success(`Ficha ${isEditing ? "editada" : "creada"}`);
                this.props.history.push("/fichas");
            })
            .catch(err => toast.warn(`No se pudo ${isEditing ? "editar" : "crear"} la ficha - ${err}`))
    }
    
    render() {

        const { pv, cantidad, prefijo, costo, plan, vendidas, total_cobrado, comision, ganancia_neta, error, folio_error, isEditing, notFound  } = this.state
    
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
                      isEditing ? <h2><span>Editar ficha</span></h2> : <h2><span>Crear </span>ficha</h2>
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
                    <div className="col-sm-6">
                        {
                            !isEditing ? <div className="form-group mb-4">
                                <Suggestions updatePV={this.updatePV} updatePVStatus={this.updatePVStatus} />
                                <small className="form-text text-muted">* Escribe el nombre</small>
                            </div> :
                            <div className="form-group mb-4">
                                <input disabled value={pv ? (pv.nombre ? pv.nombre : "") : ""} type="text" className="form-control form-control frm_field" placeholder="Localidad" />
                                <small className="form-text text-muted">* Nombre</small>
                            </div>
                        }
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group mb-4">
                            <input disabled value={pv ? (pv.localidad ? pv.localidad : "") : ""} type="text" className="form-control form-control frm_field" placeholder="Localidad" />
                            <small className="form-text text-muted">* Localidad</small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-2">
                            <input disabled value={pv ? (pv.antena ? pv.antena : "") : ""} type="text" className="form-control form-control frm_field" placeholder="Antena" />
                            <small className="form-text text-muted">* Antena</small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-2">
                            <input disabled value={pv ? (pv.enlace ? pv.enlace : "") : ""} type="text" className="form-control form-control frm_field" placeholder="Enlace" />
                            <small className="form-text text-muted">* Enlace</small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-2">
                            <input disabled value={pv ? (pv.router ? pv.router : "") : ""} type="text" className="form-control form-control frm_field" placeholder="Router" />
                            <small className="form-text text-muted">* Router</small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-2">
                            <input disabled value={pv ? (pv.ip ? pv.ip : "") : ""} type="text" className="form-control form-control frm_field" placeholder="IP" />
                            <small className="form-text text-muted">* IP</small>
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
                  <div className="col-sm-5">
                    <div className="form-group mb-2">
                      <input required onChange={this.onChange} value={plan || ""} type="text" className="form-control form-control frm_field" placeholder="Plan" name="plan" />
                      <small className="form-text text-muted">* Plan</small>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group mb-2">
                      <input required onChange={this.onChange} value={vendidas || ""} type="number" className="form-control form-control frm_field" placeholder="0" name="vendidas" />
                      <small className="form-text text-muted">* Vendidas</small>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group mb-2">
                      <input disabled onChange={this.onChange} value={total_cobrado || ""} type="number" className="form-control form-control frm_field" placeholder="0.00" name="total_cobrado" />
                      <small className="form-text text-muted">Total cobrado</small>
                    </div>
                  </div>
                    <div className="col-sm-3">
                        <div className="form-group mb-2">
                            <select className="form-control form-control frm_field" value={comision} onChange={this.onChange} name="comision" required >
                                <option key="5" value="5">5%</option>
                                <option key="10" value="10">10%</option>
                                <option key="15" value="15">15%</option>
                            </select>
                            <small className="form-text text-muted">Comisión</small>
                        </div>
                    </div>
                  <div className="col-sm-3">
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
