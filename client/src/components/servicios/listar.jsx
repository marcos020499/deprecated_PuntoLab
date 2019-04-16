// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// components
import Card from "../card/card";

// utl
import serviciosList from "./servicios";

// moment
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

class servicios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            servicios: [],
            index: 0,
            itemsToShow: 5,
            totalItems: 0
        }
    }

    requestData = () => {
        const { itemsToShow, index } = this.state;

        axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/listar", { itemsToShow, salto: (itemsToShow * index)})
            .then(res => {
                if (!res.data) {
                    return;
                }

                const { servicios, totalItems } = res.data;
                this.setState({ servicios, totalItems });
            })
            .catch(err => toast.warn("No se pueden listar los servicios - " + err))
    }


    // cuando se modifica el numero de items a mostrar
    itemsToShowChanges = (e) => {
        const { value } = e.target;

        this.setState({
            itemsToShow: value,
            index: 0
        }, () => {
            this.requestData();
        })
    }
    
    // cuando se hace click en el paginador
    pagination = (index) => {

        this.setState({
            index
        }, () => {
            this.requestData();
        });
    }
    
    componentDidMount(){
        this.requestData();
    }

    // cuando se pide eliminar un cliente
    delete = (id, type) => {

        const { permisos } = this.props.session.user;

        alertify.prompt('Confirma la eliminación', `Ingresa ${permisos === 0 ? "tu contraseña" : "una contraseña de administrador"} para eliminar el servicio`, '', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/eliminar", { password: value, id, type })
                .then(response => {
                    toast.info(`Se eliminó el servicio${permisos === 0 ? "." : " con autorización de " + response.data.admin}`);
                    this.requestData()
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        return toast.warn(`La contraseña${permisos === 0 ? "" : " de administrador"} es incorrecta.`)
                    }

                    return toast.error("No se pudo eliminar el servicio - " + err)
                })

        }, () => { }).set('type', 'password');
    }

    render() {

        const { servicios, index, totalItems, itemsToShow } = this.state;
        const iterator = Math.ceil(totalItems / itemsToShow);
        const salto = itemsToShow * (index + 1);

        return (
            <Card>
                <Helmet>
                    <title>Servicios | {app_name}</title>
                </Helmet>
                <div className="header">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Servicios </span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/servicios/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="table-filter">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="show-entries">
                                <span>Mostrar</span>
                                <select onChange={this.itemsToShowChanges}>
                                    <option>5</option>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>25</option>
                                    <option>30</option>
                                </select>
                                <span>campos</span>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Vencimiento</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Visita</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicios.map(servicio => {
                                return(
                                    <tr key={servicio._id}>
                                        <td>{moment(servicio.fechaTentativa, "YYYYMMDD").format("MMMM DD [de] [']YY")}</td>
                                        <td>{serviciosList.filter(service => service.id === servicio.tipo)[0].descripcion}</td>
                                        <td>{servicio.cliente.comunidad ? servicio.cliente.comunidad + ", " : ""}{servicio.cliente.ciudad}</td>
                                        <td>{servicio.sc === false ? <i className="material-icons"> access_time </i> : <i className="material-icons"> done </i>}</td>
                                        <td>{servicio.sc === false ? <Link to={"/servicios/" + servicio.tipo + "/visita/" + servicio._id}><i className="material-icons"> home </i></Link> : null }</td>
                                        <td>{servicio.sc === false ? <Link to={"/servicios/editar/" + servicio._id}><i className="material-icons"> edit </i></Link> : null }</td>
                                        <td onClick={() => this.delete(servicio._id, servicio.tipo)}><i className="material-icons"> delete </i> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="clearfix mt-2">
                    <div className="hint-text">
                        Mostrando <b>{salto > totalItems ? totalItems : salto}</b> de <b>{totalItems}</b> entradas
                    </div>
                    <ul className="pagination">

                        {
                            [...Array(iterator)].map((x, i) => {
                                return (
                                    <li key={i} onClick={() => this.pagination(i)} className={index === i ? "page-item active" : "page-item"}> <span className="page-link"> {i + 1} </span></li>
                                )
                            })
                        }
                    </ul>
                </div>
                
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

export default connect(mapStateToProps)(servicios);