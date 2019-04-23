// modules
import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import { connect } from "react-redux";

// components
import Card from "../../card/card";
import serviciosList from "../servicios";
import tiposPagoList from "../formasDePago";

// utl
import NotFound from "../../notFound/ContentNotFound";

// moment
import moment from "moment";

class detalle extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            notFound: false,
            _id: "",
            sc: true,
            cliente: {},
            tipo: "",
            tecnico: "",
            camaras: "",
            costo: "",
            mastil: "",
            material: "",
            sector: "",
            tipoPago: "",
            fechaSolicitud: undefined,
            fechaTentativa: undefined,
            fechaReagendado: undefined,
            fechaConclusion: undefined,
            image: undefined
        }
    }

    componentDidMount(){

        const id = this.props.match.params.id;
        if (!id) {
            return;
        }

        axios.get(process.env.REACT_APP_SERVER_IP + "api/servicios/detallar/" + id)
            .then(res => {

                if (!res.data) {
                    return;
                }

                console.log(res.data);
                
                
                // se actualiza el estado con la info del servicio
                const { costo, mastil, material, camaras, sector, tipoPago } = res.data.details
                const { _id, cliente, tipo, tecnico, sc, fechaSolicitud, fechaTentativa, fechaConclusion, fechaReagendado, image } = res.data.service
                this.setState({
                    _id,
                    sc,
                    cliente,
                    tipo,
                    tecnico: tecnico.nombre,
                    costo,
                    mastil,
                    material,
                    camaras,
                    sector,
                    tipoPago,
                    fechaSolicitud,
                    fechaTentativa,
                    fechaReagendado,
                    fechaConclusion,
                    image
                });
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return this.setState({ notFound: true })
                }

                return toast.warn("No se puede mostrar la información - " + err)
            })
    }

    // cuando se pide eliminar un servicio
    delete = () => {

        const { permisos } = this.props.session.user;
        const { _id, tipo } = this.state;

        alertify.prompt('Confirma la eliminación', `Ingresa ${permisos === 0 ? "tu contraseña" : "una contraseña de administrador"} para eliminar el servicio`, '', (evt, value) => {

            axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/eliminar", { password: value, id: _id, type: tipo })
                .then(response => {
                    toast.info(`Se eliminó el servicio${permisos === 0 ? "." : " con autorización de " + response.data.admin}`);
                    this.props.history.push('/servicios');
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        return toast.warn(`La contraseña${permisos === 0 ? "" : " de administrador"} es incorrecta.`)
                    }

                    return toast.error("No se pudo eliminar el servicio - " + err)
                })

        }, () => { }).set('type', 'password');
    }

    // cuando el cliente estuvo ausente
    reagendar = () => {
        alertify.prompt('Cliente ausente', "Ingresa la fecha de la próxima visita", '', (evt, value) => {

            const fecha = moment.utc().format();
            const nuevaFecha = moment.utc(value).format();

            if (nuevaFecha === "Invalid date") {
                return;
            }

            const { _id } = this.state;

            axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/reagendar", { _id, fecha, nuevaFecha })
                .then(response => {
                    if (response || response.data) {

                        const { fechaTentativa, fechaReagendado } = response.data;

                        this.setState({
                            fechaTentativa,
                            fechaReagendado
                        })

                        return toast.info("Se reagendó la visita")
                    }
                })
                .catch(err => {
                    if (err && err.response.status === 404) {
                        return toast.error("El servicio no existe")
                    }

                    return toast.error("No se guardar la información - " + err)
                })

        }, () => { }).set('type', 'date');
    }


    render() {

        const { _id, sc, cliente, tecnico, tipo, costo, mastil, material, camaras, sector, tipoPago, notFound, fechaSolicitud, fechaTentativa, fechaConclusion, fechaReagendado, image } = this.state;
        const { permisos } = this.props.session.user;
        const tipoName = serviciosList.filter(item => item.id === tipo)[0]
        const tipoPagoName = tiposPagoList.filter(item => item.id === tipoPago)[0]

        if (notFound) {
            return <NotFound />
        }

        return (
            <Card>
                <div className="header">
                    <div className="row">
                        <div className="col-sm-4">
                            <h2><span>Vista previa de </span>servicio</h2>
                        </div>
                        <div className="col-sm-8">
                            {
                                permisos !== 2 ?
                                <button onClick={this.delete} className="btn btn-danger">
                                    <i className="material-icons"> delete </i> <span>Borrar</span>
                                </button>
                                : null
                            }
                            {
                                image ?
                                <a className="btn btn-info" href={process.env.REACT_APP_SERVER_IP + "api/photo/" + image} data-fancybox>
                                    <i className="material-icons"> photo </i> <span>Evidencia</span>
                                </a>
                                : null
                            }
                            {
                                sc === false && permisos !== 2 ?
                                <Link to={"/servicios/editar/" + _id} className="btn btn-info">
                                    <i className="material-icons"> edit </i> <span>Editar</span>
                                </Link>
                                : null
                            }
                            {
                                sc === false ?
                                <Link to={"/servicios/" + tipo + "/visita/" + _id} className="btn btn-success">
                                    <i className="material-icons"> done_all </i> <span>Finalizar servicio</span>
                                </Link>
                                : null
                            }
                            {
                                sc === false ?
                                    <button onClick={this.reagendar} className="btn btn-secondary">
                                        <i className="material-icons"> close </i> <span>Ausente</span>
                                    </button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                {
                    sc === true ?
                        <span className="badge badge-success">Finalizado el {moment(fechaConclusion, "YYYYMMDD").local().format("DD [de] MMMM [de] YYYY") || ""}</span>
                        : <span className="badge badge-warning">Pendiente</span>
                }
                <span className="badge badge-primary">Solicitado el {moment(fechaSolicitud, "YYYYMMDD").local().format("DD [de] MMMM [de] YYYY") || ""}</span>
                {
                    fechaReagendado ?
                        <span className="badge badge-info">Re-agendado el {moment(fechaReagendado, "YYYYMMDD").local().format("DD [de] MMMM [de] YYYY") || ""}</span>
                        : null
                }
                <span className="badge badge-secondary">Vencimiento el {moment(fechaTentativa, "YYYYMMDD").local().format("DD [de] MMMM [de] YYYY") || ""}</span>

                <div className='form-content' style={{marginTop: "20px"}}>
                    <div className='row'>
                        <div className="col-sm-7">
                            <div className="form-group mb-4">
                                <input type="text" value={cliente.nombre || ""} readOnly={true} className="form-control form-control frm_field"/>
                                <small className="form-text text-muted">Nombre</small>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group mb-4">
                                <input type="text" value={tipoName ? tipoName.descripcion : ""} readOnly={true} className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Tipo de servicio</small>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group mb-4">
                                <input type="text" value={cliente.telefono || ""} readOnly={true} className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Número teléfonico</small>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group mb-4">
                                <input type="text" value={cliente.direccion || ""} readOnly={true} className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Dirección</small>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group mb-4">
                                <input type="text" readOnly={true} className="form-control form-control frm_field" value={(cliente.comunidad ? cliente.comunidad + ", " + cliente.ciudad : cliente.ciudad ) || ""} />
                                <small className="form-text text-muted">Localidad / Ciudad</small>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className='row'>
                                <div className="col-sm-3">
                                    <div className="form-group mb-4">
                                        <input type="text" value={camaras} readOnly={true} className="form-control form-control frm_field" />
                                        <small className="form-text text-muted">Cámaras</small>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group mb-4">
                                        <input type="text" value={costo} readOnly={true} className="form-control form-control frm_field" />
                                        <small className="form-text text-muted">Costo de instalación</small>
                                    </div>
                                </div>
                                
                                <div className="col-sm-5">
                                    <div className="form-group mb-4">
                                        <input type="text" value={tipoPagoName ? tipoPagoName.nombre : ""} readOnly={true} className="form-control form-control frm_field" />
                                        <small className="form-text text-muted">Forma de pago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group mb-4">
                                <input type="text" value={tecnico || ""} readOnly={true} className="form-control form-control frm_field" />
                                <small className="form-text text-muted">Técnico</small>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="form-group mb-2">
                                <textarea value={material || ""} readOnly={true} style={{height: "123px"}} type="text" className="form-control form-control frm_field" name="material"
                                    required />
                                <small className="form-text text-muted">Material utilizado</small>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className='row'>
                                <div className="col-sm-12">
                                    <div className="form-group mb-4">
                                        <input value={mastil || ""} readOnly={true} type="text" required className="form-control form-control frm_field" name="mastil" />
                                        <small className="form-text text-muted">Mástil</small>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group mb-2">
                                        <input value={sector || ""} readOnly={true} type="text" required className="form-control form-control frm_field" name="sector" />
                                        <small className="form-text text-muted">Sector</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
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

export default withRouter(connect(mapStateToProps)(detalle));