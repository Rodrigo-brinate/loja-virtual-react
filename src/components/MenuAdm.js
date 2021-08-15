import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import { Link } from 'react-router-dom';
import './MenuAdm.css'


function MenuAdm() {

function menu(e){
 var element =   document.querySelector('#menu').style.display 

 console.log(element)
   if (document.querySelector('#menu').style.display ==  ''  || document.querySelector('#menu').style.display == 'none'){
      document.querySelector('#menu').style.display = "block"
      document.querySelector('#menu').style.width = '250px'
      //document.querySelector('#menu-img').style.src = '../img/cancel.png'
     console.log(e.target.src)
     e.target.src = 'http://10.0.0.104:3000/img/cancel.png'

   }else if (document.querySelector('#menu').style.display == 'block'){ 
      document.querySelector('#menu').style.display = "none"
      e.target.src = 'http://10.0.0.104:3000/img/menu.png'
   }
}
    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
    }
  return (
     <div>
         <img onClick={menu} id="menu-img"  className="menu-img" src="../../img/menu.png" />
         <br/>
        <ul id="menu">
         <Link to="/"> <img src="../../img/home.png"/>&nbsp;<li>HOME</li></Link>
         <Link to="/create-prouct"> <img src="../../img/plus.png"/>&nbsp;<li>ADICIONAR PRODUTOS</li></Link>
         <Link to="/manange-product"> <img src="../../img/edit.png"/>&nbsp;<li>GERENCIAR PRODUTOS</li></Link>
         <Link to="/"> <img src="../../img/plus.png"/>&nbsp;<li>ADICIONAR CATEGORIAS</li></Link>
         <Link to="/"> <img src="../../img/edit.png"/>&nbsp;<li>GERENCIAR CATEGORIAS</li></Link>
         <Link to="/"> <img src="../../img/logout.png"/>&nbsp;<li onClick={logout}>SAIR</li></Link>
        </ul>
     </div>
    
  );
}

export default MenuAdm;
