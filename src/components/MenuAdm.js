import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import { Link } from 'react-router-dom';
import './MenuAdm.css'


function MenuAdm() {

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
    }
  return (
     <div   className="flex">

        <ul>
        <Link to="/"> <img src="../img/home.png"/>&nbsp;<li>HOME</li></Link>
        <Link to="/create-prouct"> <img src="../img/plus.png"/>&nbsp;<li>ADICIONAR PRODUTOS</li></Link>
        <Link to="/"> <img src="../img/edit.png"/>&nbsp;<li>GERENCIAR PRODUTOS</li></Link>
        <Link to="/"> <img src="../img/plus.png"/>&nbsp;<li>ADICIONAR CATEGORIAS</li></Link>
        <Link to="/"> <img src="../img/edit.png"/>&nbsp;<li>GERENCIAR CATEGORIAS</li></Link>
        <Link to="/"> <img src="../img/logout.png"/>&nbsp;<li onClick={logout}>SAIR</li></Link>
        
            
        </ul>
     </div>
    
  );
}

export default MenuAdm;
