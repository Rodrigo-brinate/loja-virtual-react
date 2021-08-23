import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/Login.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState('');
    const [erro, setErro] = useState()


    // get the field email
    function handleEmailChange(e) {
        setEmail(e.target.value);
       // console.log(e.target.value)
     }

     // get the field password
     function handlePasswordChange(e) {
        setPassword(e.target.value);
        //console.log(e.target.value)
     }

     // login 
  async function  handleLogin() {
        await  api
            .post("/login",{
                  email: email,
                  password: password
              })
            .then((response) => {
              localStorage.setItem('token', response.data.access_token)
              localStorage.setItem('id', response.data.id)
              localStorage.setItem('ranking', response.data.ranking)
              localStorage.setItem('name',response.data.name)
              localStorage.setItem('email', response.data.email)
              console.log(response.data)
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
              setErro(<div className="error">email ou senha incorreta</div>)
            });
            // verify if the token jwt was stored in loacal storage 
            // and redirect from home page
            if (localStorage.getItem('token') != undefined){
                console.log('teste')
                return window.location.href = "http://10.0.0.100:3000";
            }
      }
  return (
     <main>
         <div className="login">
          <h1 className="login">Login</h1>
            {erro}
          <input className="login" placeholder="digite seu email" type="email" onChange={handleEmailChange} name="email" /> 
          <input className="login" placeholder="digite sua senha " type="password" onChange={handlePasswordChange} name="password" />
          <button className="login" to="/" onClick={handleLogin}>entrar</button>
          <div className="register">
            <br/>
            ainda não tem conta <br/>
            <Link className="register" to="/register">cadastre-se</Link>
          </div>  
        </div>
     </main>
  );
}
export default Login;
