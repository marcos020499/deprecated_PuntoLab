// modules
import React, { Component } from 'react'

// Components
import Card from "../card/card";

export default class not_found extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
      notFound: { title: "El contenido no existe", details: "La dirección que has solicitado no se encontró, asegurate que está bien escrita."},
      unautorized: { title: "Acceso denegado", details: "No tienes permiso para ver este contenido, solicitalo al administrador." }
    }
  }
  

  render() {

    const statusCode = this.props.statusCode || 404;
    const { notFound, unautorized } = this.state;

    return (
      <Card>
        <h4>{ statusCode === 404 ? notFound.title : unautorized.title }</h4>
        <p style={{ marginTop: "20px", fontWeight: "300" }}>{statusCode === 404 ? notFound.details : unautorized.details }</p>
      </Card>
    )
  }
}
