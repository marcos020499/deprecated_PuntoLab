import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

// components
import Card from "../../card/card";

class visitaTecnico extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            material: "",
            mastil: "",
            sector: ""
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

        const { material, mastil, sector } = this.state;

        axios.post(process.env.REACT_APP_SERVER_IP + "api/servicios/1/visita", { id, material, mastil, sector })
            .then(res => {
                if (res.status && res.status === 200) {
                    this.props.history.push("/servicios");
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

        const { material, mastil, sector } = this.state;

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
                                <div className="form-group mb-4">
                                    <textarea onChange={this.onChange} value={material} type="text" className="form-control form-control frm_field" placeholder="Materiales" name="material"
                                        required />
                                    <small className="form-text text-muted">* Material utilizado</small>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group mb-4">
                                    <input onChange={this.onChange} value={mastil} type="text" required className="form-control form-control frm_field" placeholder="Mástil" name="mastil" />
                                    <small className="form-text text-muted">* Mástil</small>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group mb-2">
                                    <input onChange={this.onChange} value={sector} type="text" required className="form-control form-control frm_field" placeholder="Sector" name="sector" />
                                    <small className="form-text text-muted">* Sector</small>
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