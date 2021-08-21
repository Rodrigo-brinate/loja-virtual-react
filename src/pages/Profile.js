import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'



function Profile() {
    if (localStorage.getItem('token') == undefined){
        return <Redirect to="/login/" />
    }
  return (
     <main>
         <MenuAdm />
    <div className="container">
         <i class='bx bxs-user-circle'></i>

         <h5>nome:</h5><p>{localStorage.getItem('name')}</p>
         <h5>email:</h5><p>{localStorage.getItem('email')}</p>
         <button className="change-password">mudar senha</button>
         </div>
     </main>
  );
}
export default Profile;
