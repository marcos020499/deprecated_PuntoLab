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
            menuItems: [
                {
                    title: "Menú principal",
                    items: [
                        {
                            name: "Clientes",
                            icon: "people",
                            url: "/clientes"
                        },
                        {
                            name: "* Ver reportes",
                            icon: "label_important",
                            url: "/reportes/ver"
                        },
                        {
                            name: "* Crear reporte",
                            icon: "label_important",
                            url: "/reportes/crear"
                        },
                    ]
                },
                {
                    title: "Configuración",
                    items: [
                        {
                            name: "Usuarios",
                            icon: "people_outline",
                            url: "/usuarios"
                        },
                        {
                            name: "* Cambiar contraseña",
                            icon: "security",
                            url: "/password"
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

        const { selected, menuItems } = this.state
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
                            menuItems.map((section, index) => {

                                const items = section.items.map((item, i) => {    
 
                                    return (
                                        <li key={index + i.toString()} onClick={() => this.onClick(item.name)} >
                                            <Link to={item.url} className={selected === item.name ? "selected" : ""}>
                                                <i className="material-icons"> {item.icon} </i>
                                                <span className="menu-title">{item.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })

                                if (items.length === 0) {
                                    return(null);
                                }

                                return(
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