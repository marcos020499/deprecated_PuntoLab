import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { app_name } from "../../../config/strings";

// components
import Card from "../../card/card";

// moment
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

class visitaTecnico extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            material: "",
            mastil: "",
            sector: "",
            textoImagen: ""
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

        const id = this.props.match.params.id;
        if (!id) {
            return;
        }

        let data = new FormData();
        const inputFile = document.querySelector('input[type="file"]');

        if (inputFile.files && inputFile.files[0]) {
            const imagedata = inputFile.files[0];
            data.append("picture", imagedata);
        }

        const fecha = moment().startOf('day').format();
        const { material, mastil, sector } = this.state;

        data.set("id", id);
        data.set("material", material);
        data.set("mastil", mastil);
        data.set("sector", sector);
        data.set("fecha", fecha);

        axios({
            method: 'post',
            url: process.env.REACT_APP_SERVER_IP + "api/servicios/1/visita",
            data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
        .then(res => {
            if (res.status && res.status === 200) {
                this.props.history.replace("/servicios/" + res.data.tipo + "/ver/" + res.data._id);
                return toast.success("Se guardó la información")
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                return toast.warn("El registro que intentas modificar no existe")
            } else if (err.response && err.response.status === 401) {
                return toast.warn("No se puede realizar la acción porque el servicio ya se finalizó")
            }

            toast.error("No se puede realizar la acción - " + err)
        })
    }

    updateImgLabel = () => {
        const inputFile = document.querySelector('input[type="file"]');

        let textoImagen = "";
        if (inputFile.files && inputFile.files[0]) {
            const filename = inputFile.files[0].name;
            textoImagen = filename.substring(0, 28);
        }

        this.setState({
            textoImagen
        })
    }

    render() {

        const { material, mastil, sector, textoImagen } = this.state;

        return (
            <Card>
                <Helmet>
                    <title>Finalizar servicio | {app_name}</title>
                </Helmet>
                <form onSubmit={this.onSubmit}>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2><span>Finalizar </span>servicio</h2>
                            </div>
                            <div className="col-sm-4">
                                <button type="submit" className="btn btn-success">
                                    <i className="material-icons"> backup </i> <span>Finalizar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-content'>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group mb-4">
                                    <textarea rows="4" onChange={this.onChange} value={material} type="text" className="form-control form-control frm_field" placeholder="Materiales" name="material"
                                        required />
                                    <small className="form-text text-muted">* Material utilizado</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-2">
                                    <input onChange={this.onChange} value={mastil} type="text" required className="form-control form-control frm_field" placeholder="Mástil" name="mastil" />
                                    <small className="form-text text-muted">* Mástil</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-2">
                                    <input onChange={this.onChange} value={sector} type="text" required className="form-control form-control frm_field" placeholder="Sector" name="sector" />
                                    <small className="form-text text-muted">* Sector</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="custom-file form-group mb-4">
                                    <input onChange={this.updateImgLabel} type="file" className="custom-file-input frm_field" name="picture" accept="image/*" />
                                    <label className="custom-file-label frm_video">{textoImagen || "Evidencia opcional"}</label>
                                    <small className="form-text text-muted">Selecciona un archivo</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}

export default withRouter(visitaTecnico);