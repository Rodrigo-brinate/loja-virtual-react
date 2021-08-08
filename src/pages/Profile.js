import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'



function Profile() {
    console.log(localStorage.getItem('token')) 

if (localStorage.getItem('token') == undefined){
    return <Redirect to="/login/" />
}


  return (
     <main>
         <MenuAdm />
     </main>
    
  );
}

export default Profile;
