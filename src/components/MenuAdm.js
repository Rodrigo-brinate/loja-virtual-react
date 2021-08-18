import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import { Link } from 'react-router-dom';
import './styles/MenuAdm.css'


function MenuAdm() {
   const [ranking, setRnking] = useState('')

   function menu(e){
      console.log('test')
      var element =   document.querySelector('#menu').style
      console.log(element)
      if (document.querySelector('#menu').style.width ==  ''  || document.querySelector('#menu').style.width == '75px'){
        // document.querySelector('#menu').style.width = "300px"
         document.querySelector('#menu').style.width = '300px'
         document.querySelector('.user-name').style.display = 'block'
         document.querySelector('.menu-footer').style.display = 'flex'
         document.querySelector('.menu-footer').style.backgroundColor = 'rgb(21,19,35)'
         
         //document.querySelector('#menu-img').style.src = '../img/cancel.png'
      console.log(e.target.src)
      //e.target.src = 'http://10.0.0.104:3000/img/cancel.png'
      

      }else if (document.querySelector('#menu').style.width == '300px'){ 
         document.querySelector('#menu').style.width = "75px"
         document.querySelector('.menu-footer').style.backgroundColor = 'rgb(18,16,29)'
         document.querySelector('.user-name').style.display = 'none'
         document.querySelector('.menu-footer').style.display = 'block'
         e.target.src = 'http://10.0.0.104:3000/img/menu.png'
      }
   }
  


  
    
    function logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
  }



  return (
     <div className="teste">
        
        
        <br/>
        <ul id="menu">
<div>
<i  class='bx bx-menu icon' onClick={menu} ></i>

         <Link to="/">
            <i className='bx bxs-home icon'></i>
            <li>Home</li>
         </Link>

         <Link to="/create-prouct">
            <i className='bx bxs-add-to-queue icon'></i>
            <li>Asicionar produtos</li>
         </Link>

         <Link to="/manange-product">
            <i className='bx bxs-edit icon'></i>
            <li>Gerenciar produtos</li>
         </Link>

         <Link to="/">
            <i className='bx bxs-add-to-queue icon'></i>
            <li>Adicionar categorias</li>
         </Link>

         <Link to="/">
            <i className='bx bxs-edit icon'></i>
            <li>Gerenciar categorias</li>
         </Link>
         </div>
         
         <div className="menu-footer">
            <div className="user">
            <i class='bx bxs-user icon'></i>
            <p className="user-name">{localStorage.getItem('name')}</p>
        </div>
            <Link to="/">
               <i onClick={logout} className='bx bx-log-out icon'></i>
            </Link>
         </div>
        </ul>
     </div>
    
  );
}

export default MenuAdm;
