// modules
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { app_name } from "../../config/strings"

// utls
import "./styles.css"

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

               localStorage.setItem('jwtToken', token);
               this.props.setCurrentUser(user);
               this.props.history.push("/");
            }
         })
         .catch(err => {
            if (err.response.status === 404) {
               return toast.error("Credenciales inválidas")
            }

            toast.error(err.response.data)
         });
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
 
const mapDispatchToProps = {
   setCurrentUser
}

export default withRouter (
   connect(null, mapDispatchToProps)(login)
);