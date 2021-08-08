import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './Login.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
       // console.log(e.target.value)
     }
     function handlePasswordChange(e) {
        setPassword(e.target.value);
        //console.log(e.target.value)
     }

     
async function  handleLogin() {
     ///console.log('teste')
      await  api
          .post("/login",{
                email: email,
                password: password
     })
          .then((response) => {
          console.log(response.data)
           localStorage.setItem('token', response.data.access_token)
           localStorage.setItem('id', response.data.id)
          }
           )
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      
         
          console.log(localStorage.getItem('token'))
        
          
             
          if (localStorage.getItem('token') != undefined){
              console.log('teste')
              return window.location.href = "http://10.0.0.104:3000";
          }
         
          
     }

    // console.log(localStorage.getItem('token'))


  return (
     <main>
         <div className="login">
         <h1 className="login">login</h1>

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
