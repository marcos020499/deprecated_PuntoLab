// modules
import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";
import { withRouter } from "react-router-dom";

// components
import Card from "../card/card";
import serviciosList from "./servicios";
import Suggestions from "./suggestions/clientes";
import NotFound from "../notFound/ContentNotFound";

// servicios
import InstalacionInternet from "./instalacionInternet/internetForm";
import InstalacionCamaras from "./instalacionCamaras/camarasForm";
import Soporte from "./soporte/soporte";

// redux
import { setServiceDetails } from "../../redux/actions/servicioDetalleActions";

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

class servicios extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            _id: undefined,
            tecnicos: [],
            cliente: undefined,
            servicio: "0",
            tecnico: "",
            isEditing: false,
            notFound: false
        }
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

    // enviar los datos al servidor
    onSubmit = (e) => {
        e.preventDefault();

        const { _id, cliente, servicio, tecnico, isEditing } = this.state;
        const { serviceData } = this.props;
        
        if (!cliente) {
            return toast.warn("No tienes un cliente seleccionado")
        }

        const fechaTentativa = moment.utc(momentbussines().businessAdd(6)._d).startOf('day').format()
        const fechaSolicitud = moment.utc().startOf('day').format();
        
        const ip = isEditing === false ? "api/servicios/" + servicio + "/nuevo" : "api/servicios/" + servicio + "/editar"

        axios.post(process.env.REACT_APP_SERVER_IP + ip, { _id, cliente: cliente._id, data: serviceData.data, tecnico, tipo: servicio, fechaTentativa, fechaSolicitud })
            .then(res => {
                if (res.status === 201) {

                    toast.success(`Se ${isEditing === true ? "guardó" : "creó"} el elemento`);

                    if (isEditing) {
                        this.props.history.push("/servicios/" + res.data.tipo + "/ver/" + res.data._id);
                    } else {
                        this.props.history.push("/servicios");
                    }
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    return toast.warn("No se puede realizar la acción porque el servicio ya se finalizó")
                }

                toast.error("No se pudo realizar la acción - " + err)
            })
    }

    componentDidMount() {

        // carga la información necesaria para llenar los select list
        axios.get(process.env.REACT_APP_SERVER_IP + "api/usuarios/listar")
            .then(res => {
                if (!res.data) {
                    return;
                }

                const tecnicos = res.data.filter(item => item.permisos === 2)
                this.setState({ tecnicos, tecnico: tecnicos[0]._id });
            })
            .catch(err => toast.warn("No se pueden listar los técnicos - " + err))

        // si no hay ID significa que no se está editando, entonces se detiene hasta aqui. 
        const id = this.props.match.params.id;   
        if (!id) {
            return;
        }

        // como si hay ID el estado cambia a editando
        this.setState({ isEditing: true })
        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/detallar/" + id)
            .then(res => {
                
                // se actualiza el estado con la info del servicio
                const { _id, cliente, tipo, tecnico } = res.data.service
                this.setState({
                    _id,
                    cliente,
                    servicio: tipo,
                    tecnico: tecnico._id
                });
                
                // se manda a redux el detalle del servicio y se cambia tambien a editando
                this.props.setServiceDetails({
                    isEditing: true,
                    data: res.data.details
                })
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return this.setState({ notFound: true })
                }

                return toast.warn("No se puede mostrar la información - " + err)
            })
    }

    render() {

        const { cliente, servicio, tecnicos, tecnico, notFound, isEditing } = this.state;

        if (notFound) {
            return <NotFound />
        }

        return (
            <Card>
                <Helmet>
                    <title>{isEditing === true ? "Editar" : "Crear"} servicio | {app_name}</title>
                </Helmet>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>{isEditing === true ? "Editar" : "Nuevo"} </span>servicio</h2>
                            </div>
                            <div className="col-sm-4">
                                <button id="btn_send" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>{isEditing === true ? "Guardar" : "Crear"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            {
                                isEditing === false ?
                                    <div className="col-sm-7">
                                        <div className="form-group mb-4">
                                            <Suggestions updateCliente={this.updateCliente} updateClientesStatus={this.updateClientesStatus} />
                                            <small className="form-text text-muted">Busqueda por nombre</small>
                                        </div>
                                    </div>
                                : null
                            }
                            <div className="col-sm-5" hidden={isEditing}>
                                <div className="form-group mb-4">
                                    <select onChange={this.onChange} value={servicio} name="servicio" className="form-control form-control frm_field" required disabled={isEditing}>
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
                            {
                                isEditing === false ?
                                    <div className="col-sm-3">
                                        <div className="form-group mb-4">
                                            <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.telefono ? cliente.telefono : "") : ""} />
                                            <small className="form-text text-muted">Número teléfonico</small>
                                        </div>
                                    </div>
                                : null
                            }
                            {
                                isEditing === false ?
                                    <div className="col-sm-4">
                                        <div className="form-group mb-4">
                                            <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.direccion ? cliente.direccion : "") : ""} />
                                            <small className="form-text text-muted">Dirección</small>
                                        </div>
                                    </div>
                                : null
                            }
                            {
                                isEditing === false ?
                                <div className="col-sm-5">
                                    <div className="form-group mb-4">
                                        <input disabled type="text" className="form-control form-control frm_field" value={cliente ? (cliente.comunidad ? cliente.comunidad + ", " + cliente.ciudad : cliente.ciudad) : ""} />
                                        <small className="form-text text-muted">Localidad / Ciudad</small>
                                    </div>
                                </div>
                                : null
                            }
                            <div className='col-sm-7'>
                                {
                                    serviciosList[servicio].id === "0" ? <InstalacionInternet /> :
                                    serviciosList[servicio].id === "1" ? <InstalacionCamaras /> :
                                    serviciosList[servicio].id === "2" ? <Soporte /> :
                                    serviciosList[servicio].id === "3" ? <Soporte /> :
                                    null
                                }
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group mb-2">
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

const mapStateToProps = (state) => {
    const { serviceDetails } = state;
    return {
        serviceData: serviceDetails
    };
}
 
const mapDispatchToProps = {
    setServiceDetails
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(servicios)
)