// assets
import logo from "./logo.png"
import "./styles.css"

// modules
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class menu extends Component {

    constructor(props) {
      super(props)
    
        this.state = {
            selected: "",
            menu: [
                {
                    title: "Menú principal",
                    items: [
                        {
                            name: "Clientes",
                            icon: "people",
                            url: "/clientes",
                            permisos: [0, 1]
                        },
                        {
                            name: "* Ver reportes",
                            icon: "label_important",
                            url: "/reportes/ver",
                            permisos: [0, 1, 2]
                        },
                        {
                            name: "* Crear reporte",
                            icon: "label_important",
                            url: "/reportes/crear",
                            permisos: [0, 1]
                        },
                    ]
                },
                {
                    title: "Configuración",
                    items: [
                        {
                            name: "Usuarios",
                            icon: "people_outline",
                            url: "/usuarios",
                            permisos: [0]
                        },
                        {
                            name: "* Cambiar contraseña",
                            icon: "security",
                            url: "/password",
                            permisos: [0, 1, 2]
                        },
                    ]
                }
            ]
        }
    }

    onClick = (item) => {

        this.setState({
            selected: item
        })
    }

    render() {

        const { selected, menu } = this.state
        const { session } = this.props;

        return (
            <div className="main-menu">
                <ul>
                    <div className="profile">
                        <img src={logo + ".sdsd"} alt="logo" />
                        <p>BIENVENIDO</p>
                        <h6>{ session.user ? session.user.nombre : "" }</h6>
                    </div>
                    <div className='MenuItemsContainer'>
                        {
                            menu.map((section, index) => {

                                const items = section.items.map((item, i) => {

                                    if (item.permisos.filter(i => i === session.user.permisos).length === 0) {
                                        return null;
                                    }

                                    return (
                                        <li key={index + i.toString()} onClick={() => this.onClick(item.name)} >
                                            <Link to={item.url} className={selected === item.name ? "selected" : ""}>
                                                <i className="material-icons"> {item.icon} </i>
                                                <span className="menu-title">{item.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })

                                // si la seccion no tiene ningun item retornamos nulo
                                if (items.length === 0) {
                                    return null;
                                }

                                return (
                                    <div key={index}>
                                        <li className="nav-header">{section.title}</li>
                                        {items}
                                    </div>
                                )
                            })
                        }
                    </div>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const { session } = state;
    
    return {
        session
    }
}

export default connect(mapStateToProps)(menu);