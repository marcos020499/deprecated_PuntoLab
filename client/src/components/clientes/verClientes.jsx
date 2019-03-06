// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import alertify from 'alertifyjs';
import { toast } from "react-toastify";

// components
import Card from "../card/card";

export default class verClientes extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
          clientes: [],
          index: 0,
          itemsToShow: 5,
          totalItems: 0,
          filterWord: ""
      }
    }

    // solicita los datos al servidor
    requestData() {

        const { itemsToShow, index, filterWord } = this.state

        axios.post(process.env.REACT_APP_SERVER_IP + "api/clientes/listar", { itemsToShow, filtro: filterWord, salto: (itemsToShow * index) })
            .then(res => {
                if (!res.data) {
                    return;
                }

                const { clientes, totalItems } = res.data

                this.setState({
                    clientes,
                    totalItems
                });
            })
            .catch(err => toast.warn("No se puede mostrar la información - " + err))
    }

    // cuando el componente se monta
    componentDidMount(){
        this.requestData();
    }

    // cuando se hace click en el paginador
    pagination = (index) => {

        this.setState({
            index
        }, () => {
            this.requestData();
        });
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

    // cuando se hace enter en el cuadro para buscar
    filter = (e) => {
        
        if (e.key === 'Enter') {

            const { value } = e.target;

            this.setState({
                index: 0,
                filterWord: value
            }, () => {
                this.requestData();
            })
        }
    }

    // cuando se pide eliminar un cliente
    delete = (id) => {
        alertify.prompt('Confirma la eliminación', 'Ingresa la contraseña de administrador para eliminar este elemento', '', (evt, value) => {
            
            axios.post(process.env.REACT_APP_SERVER_IP + "api/clientes/eliminar", { password: value, id })
                .then(response => {
                    toast.info("Se eliminó el cliente");
                    this.requestData()
                })
                .catch(err => toast.error("No se pudo eliminar el cliente - " + err))

        }, () => { }).set('type', 'password');
    }

    render() {

        const { clientes, index, totalItems, itemsToShow } = this.state
        const iterator = Math.ceil(totalItems / itemsToShow)
        const salto = itemsToShow * (index + 1)

        return (
            <Card>
                <div className="header">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2><span>Clientes </span></h2>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/clientes/crear" className="btn btn-success">
                                <i className="material-icons"> add </i> <span>Agregar</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="table-filter">
                    <div className="row">
                        <div className="col-sm-3">
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
                        <div className="col-sm-9">
                            <div className="filter-group">
                                <label>Buscar nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onKeyDown={this.filter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(cliente => {
                                return (
                                    <tr key={cliente._id}>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.comunidad ? cliente.comunidad + ", " : ""} {cliente.ciudad}</td>
                                        <td><Link to={"/clientes/editar/" + cliente._id}><i className="material-icons"> edit </i></Link></td>
                                        <td onClick={() => this.delete(cliente._id)}><i className="material-icons"> delete </i></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="clearfix">
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
