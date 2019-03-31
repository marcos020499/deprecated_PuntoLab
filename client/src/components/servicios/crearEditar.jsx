// modules
import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";

// components
import Card from "../card/card";
import serviciosList from "./servicios";
import Suggestions from "./suggestions/clientes";

// servicios
import InstalacionInternet from "./instalacionInternet/internetForm";
import InstalacionCamaras from "./instalacionCamaras/camarasForm";
import Soporte from "./soporte/soporte";

// moment
import momentbussines from "moment-business-days";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
momentbussines.updateLocale("es", {
    // dias laborados
    // 1 lunes, 2 martes, 3 miercoles, 4 jueves, 5 viernes, 6 sabado, 7 domingo
    workingWeekdays: [1, 2, 3, 4, 5]
});

export default class servicios extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            tecnicos: [],
            cliente: undefined,
            servicio: 0,
            serviceData: undefined,
            tecnico: ""
        }
    }

    // actualiza el estado de acuerdo a los datos que vienen
    // del formulario de detalle de servicio
    updateServiceData = (serviceData) => {
        console.log(serviceData);
        
        this.setState({ serviceData });
    }

    // actualiza el cliente en el estado de acuerdo a los
    // datos que vienen del componente de sugerencias
    updateCliente = (cliente) => {
        this.setState({ cliente });
    }

    // bindeo de componentes del form
    onChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           [name]: value
       });
    }

    // lista los tecnicos dados de alta en el sistema
    componentDidMount(){
        axios.get(process.env.REACT_APP_SERVER_IP + "api/usuarios/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                const tecnicos = res.data.filter(item => item.permisos === 2)
                this.setState({ tecnicos, tecnico: tecnicos[0]._id });
            })
            .catch(err => toast.warn("No se pueden listar los técnicos - " + err))
    }

    // enviar los datos al servidor
    onSubmit = (e) => {
        e.preventDefault();

        const { cliente, servicio, serviceData, tecnico } = this.state;
        if (!cliente || !serviceData) {
            return toast.warn("Completa la información necesaria")
        }

        const fechaTentativa = moment(momentbussines().businessAdd(6)._d).format('L')

        axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/" + servicio + "/nuevo", { cliente: cliente._id, data: serviceData, tecnico, tipo: servicio, fechaTentativa })
            .then(res => {
                if (res.status === 201) {
                    toast.success("Se creó el elemento")
                }
            })
            .catch(err => toast.err("No se pudo realizar la acción - " + err))
    }

    render() {

        const { cliente, servicio, tecnicos, tecnico } = this.state;

        return (
            <Card>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>Nuevo </span>servicio</h2>
                            </div>
                            <div className="col-sm-4">
                                <button id="btn_send" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>Guardar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="form-group mb-4">
                                    <Suggestions updateCliente={this.updateCliente} updateClientesStatus={this.updateClientesStatus} />
                                    <small className="form-text text-muted">Busqueda por nombre</small>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-4">
                                    <select onChange={this.onChange} name="servicio" className="form-control form-control frm_field" required>
                                        {
                                            serviciosList.map(servicio => {
                                                return(
                                                    <option key={servicio.id} value={servicio.id}>{ servicio.descripcion }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="form-text text-muted">Tipo de servicio</small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group mb-4">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.telefono ? cliente.telefono : "") : ""} />
                                    <small className="form-text text-muted">Número teléfonico</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.direccion ? cliente.direccion : "") : ""}/>
                                    <small className="form-text text-muted">Dirección</small>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-4">
                                    <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.comunidad ? cliente.comunidad + ", " + cliente.ciudad : cliente.ciudad) : "" } />
                                    <small className="form-text text-muted">Localidad / Ciudad</small>
                                </div>
                            </div>
                            <div className='col-sm-7'>
                                {
                                    serviciosList[servicio].id === "0" ? <InstalacionInternet updateServiceData={this.updateServiceData} /> :
                                    serviciosList[servicio].id === "1" ? <InstalacionCamaras updateServiceData={this.updateServiceData} /> :
                                    serviciosList[servicio].id === "2" ? <Soporte updateServiceData={this.updateServiceData}/> :
                                    serviciosList[servicio].id === "3" ? <Soporte updateServiceData={this.updateServiceData}/> :
                                    null
                                }
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-4">
                                    <select className="form-control form-control frm_field" value={tecnico} onChange={this.onChange} name="tecnico" required >
                                        {
                                            tecnicos.map(tecnico => {
                                                return <option key={tecnico._id} value={tecnico._id}>{tecnico.nombre}</option>
                                            })
                                        }
                                    </select>
                                    <small className="form-text text-muted">Técnico</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}
