// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// components
import Card from "../card/card";

// utl
import serviciosList from "./servicios";

// moment
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default class servicios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            servicios: []
        }
    }
    
    componentDidMount(){
        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                this.setState({ servicios: res.data });
            })
            .catch(err => toast.warn("No se pueden listar los servicios - " + err))
    }

    render() {

        const { servicios } = this.state;

        return (
            <Card>
                <div className="header" style={{ marginBottom: "0px" }}>
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
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Vencimiento</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicios.map(servicio => {
                                return(
                                    <tr key={servicio._id}>
                                        <td>{moment(servicio.fechaTentativa, "YYYYDDMM").format("MMMM DD [de] [']YY")}</td>
                                        <td>{serviciosList.filter(service => service.id === servicio.tipo)[0].descripcion}</td>
                                        <td>{servicio.cliente.comunidad ? servicio.cliente.comunidad + ", " : ""}{servicio.cliente.ciudad}</td>
                                        <td><a href="/reporte_add.html"><i className="material-icons"> edit </i></a></td>
                                        <td><i className="material-icons"> delete </i> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                
            </Card>
        )
    }
}
