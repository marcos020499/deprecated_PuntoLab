// modules
import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings";

// Components
import Card from "../card/card";

export default class not_found extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
      notFound: { title: "El contenido no existe", details: "La dirección que has solicitado no se encontró."},
      unautorized: { title: "Acceso denegado", details: "No tienes permiso para ver este contenido" }
    }
  }

  render() {

    const statusCode = this.props.statusCode || 404;
    const { notFound, unautorized } = this.state;

    return (
      <Card>
        <Helmet>
          <title>{statusCode === 404 ? "404" : "401"} | {app_name}</title>
        </Helmet>
        <h4>{ statusCode === 404 ? notFound.title : unautorized.title }</h4>
        <p style={{ marginTop: "20px", fontWeight: "300" }}>{statusCode === 404 ? notFound.details : unautorized.details }</p>
      </Card>
    )
  }
}
