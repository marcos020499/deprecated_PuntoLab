// assets
import "./styles.css"

// modules
import React, { Component } from 'react'
import { connect } from "react-redux";
import { deleteAuthToken } from "../common/HTTPAuthorization";

// redux
import { removeCurrentUser } from "../../redux/actions/sessionActions";

class navbar extends Component {

    logout = () => {
        this.props.removeCurrentUser();
        deleteAuthToken();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/">Panel de administración</a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                PuntoLab
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <h5 onClick={this.logout} className="nav-link">Cerrar sesión</h5>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
 
const mapDispatchToProps = {
    removeCurrentUser
}

export default connect(null, mapDispatchToProps)(navbar);
