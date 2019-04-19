import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

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
            problemaReal: ""
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

        let tipo;
        if (this.props.match.path === "/servicios/2/visita/:id") {
            tipo = 2;
        } else if (this.props.match.path === "/servicios/3/visita/:id"){
            tipo = 3;
        }

        const fecha = moment().format();
        const { problemaReal } = this.state;

        axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/" + tipo + "/visita", { id, problemaReal, fecha })
            .then(res => {
                if (res.status && res.status === 200) {
                    this.props.history.replace("/servicios/" + res.data.tipo + "/ver/" + res.data._id);
                    return toast.success("Se guardó la información")
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    return toast.warn("El registro que intentas modificar no existe")
                }

                toast.error("No se puede realizar la acción - " + err)
            })
    }

    render() {

        const { problemaReal } = this.state;

        return (
            <Card>
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
                                <div className="form-group mb-2">
                                    <textarea rows="4" onChange={this.onChange} value={problemaReal} type="text" className="form-control form-control frm_field" placeholder="Problema" name="problemaReal"
                                        required />
                                    <small className="form-text text-muted">Problema real</small>
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