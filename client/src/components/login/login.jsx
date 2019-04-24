// modules
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings"
import menuItems from "../menu/items.json";

// utls
import "./styles.css"
import { notificarServiciosAlerta } from "../notificaciones_servicios/notificaciones";
import { setAuthToken } from "../common/HTTPAuthorization";

// redux
import { setCurrentUser } from "../../redux/actions/sessionActions";

class login extends Component {   

   constructor(props) {
      super(props)

      this.state = {
         usuario: "",
         password: ""
      }
   }

   // se valida si existe una sesión para redireccionar a otro lado
   componentWillMount(){
        const { session } = this.props
        if (!session.isAuth) {
           return; 
        }

        const redirect = this.getRedirectUrl(session.user);

        // si tiene al menos una url
        if (redirect.length > 0) {
            // se redirecciona a la primera url
            return this.props.history.push(redirect[0]);
        }

        // si no se manda a 404
        return this.props.history.push("/404");
   }
   
   onChange = (e) => {
      const { name, value } = e.target;
      this.setState({
         [name]: value
      });
   }

   onSubmit = (e) => {
      e.preventDefault();

      const { usuario, password } = this.state;

      axios.post(process.env.REACT_APP_SERVER_IP + "api/auth", { usuario, password })
         .then(response => {
            if (response.status === 200) {
               const { token, user } = response.data

               // guardar en local storage y axios el token
               // y guardar en redux el usuario
               localStorage.setItem('jwtToken', token);
                setAuthToken(token);
               this.props.setCurrentUser(user);

               // si es un tecnico se notifica sobre los servicios
               // proximos a vencerse
               if (user.permisos === 2) {
                   notificarServiciosAlerta(user._id);
               }

               const redirect = this.getRedirectUrl(user);

               // si tiene al menos una url
               if (redirect.length > 0) {
                  // se redirecciona a la primera url
                  return this.props.history.push(redirect[0]);
               }
               
               // si no se manda a 404
               return this.props.history.push("/404");
            }
         })
         .catch(err => {
            if (err.response && err.response.status === 404) {
               return toast.error("Credenciales inválidas")
            }
         });
   }

   getRedirectUrl = (user) => {
       // se arma un nuevo arreglo con las URL permitidas para este usuario
       return menuItems.menu.reduce((_acumulador, section) => {
           const results = section.items.reduce((acumulador, item) => {
               if (item.permisos.filter(i => i === user.permisos).length > 0) {
                   return [...acumulador, item.url]
               }
               return [...acumulador];
           }, [])

           return [..._acumulador, ...results]
       }, [])
   }

   render(){

      const { usuario, password } = this.state;

      return(
         <div>
            <Helmet>
               <title>Login | {app_name}</title>
            </Helmet>
            <div className="card-alternative">
               <div className="wrap">
                  <div className="card-content">
                     <form className="login-form" onSubmit={this.onSubmit}>
                        <input onChange={this.onChange} value={usuario} type="text" placeholder="Nombre de usuario" name="usuario" />
                        <input onChange={this.onChange} value={password} type="password" placeholder="Contraseña" name="password" />
                        <button>login</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
       session: state.session
   }
}

const mapDispatchToProps = {
   setCurrentUser
}

export default withRouter (
   connect(mapStateToProps, mapDispatchToProps)(login)
);