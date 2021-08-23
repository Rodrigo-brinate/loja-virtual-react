import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import { Link } from 'react-router-dom';
import './styles/MenuAdm.css'


function MenuAdm() {
   const [menuShow, setMenuShow] = useState('')
   const [ranking, setRanking] = useState('')

   function menu(e){
      console.log('test')
      var element =   document.querySelector('#menu').style
      console.log(element)
      if (document.querySelector('#menu').style.width ==  ''  || document.querySelector('#menu').style.width == '75px'){
        // document.querySelector('#menu').style.width = "300px"
         document.querySelector('#menu').style.width = '300px'
         console.log(document.getElementsByTagName('li'))
         document.querySelector('.user-name').style.display = 'block'
         document.querySelector('.menu-footer').style.display = 'flex'

let element = document.getElementsByTagName('li')
Array.from(element).forEach(element => {
          element.style.display = 'list-item'
        });
        
        

         document.querySelector('.menu-footer').style.backgroundColor = 'rgb(21,19,35)'
         
         //document.querySelector('#menu-img').style.src = '../img/cancel.png'
      
      //e.target.src = 'http://10.0.0.104:3000/img/cancel.png'
      

      }else if (document.querySelector('#menu').style.width == '300px'){ 
         document.querySelector('#menu').style.width = "75px"
         document.querySelector('.menu-footer').style.backgroundColor = 'rgb(18,16,29)'
         document.querySelector('.user-name').style.display = 'none'
         document.querySelector('.menu-footer').style.display = 'block'
         let element = document.getElementsByTagName('li')
Array.from(element).forEach(element => {
          element.style.display = 'none'
        });
         e.target.src = 'http://10.0.0.104:3000/img/menu.png'
      }
   }
  
   useEffect(() => {
if (localStorage.getItem('ranking') == 3){
 setMenuShow(
   <ul id="menu">
         
   <div>
      <h3 className="logo-menu">logo</h3>
      <div className="flex">
   
         <i  class='bx bx-menu icon' onClick={menu} ></i>
         <Link to="/">
         <li className="li dashbord">Dashbord</li>
         </Link>
      </div>
            <Link to="/">
               <i className='bx bxs-home icon'></i>
               <li className="li">Home</li>
            </Link>
   
            
            <div className="menu-footer">
               <div className="user">
                  <Link to="/profile">
               <i className='bx bxs-user icon'></i>
               <p className="user-name">{localStorage.getItem('name')}</p>
               </Link>
           </div>
               <Link to="/">
                  <i onClick={logout} className='bx bx-log-out icon'></i>
               </Link>
            </div>
            </div>
           </ul>
 )
}
}, [])

useEffect(() => {
  if (localStorage.getItem('ranking') == 1){
   setMenuShow(
      <ul id="menu">
         
      <div>
         <h3 className="logo-menu">logo</h3>
         <div className="flex">
      
            <i  class='bx bx-menu icon' onClick={menu} ></i>
            <Link to="/">
            <li className="li dashbord">Dashbord</li>
      </Link>
         </div>
               <Link to="/">
                  <i className='bx bxs-home icon'></i>
                  <li className="li">Home</li>
               </Link>
      
               <Link to="/create-prouct">
                  <i className='bx bxs-add-to-queue icon'></i>
                  <li className="li">Adicionar produtos</li>
               </Link>
      
               <Link to="/manange-product">
                  <i className='bx bxs-edit icon'></i>
                  <li className="li">Gerenciar produtos</li>
               </Link>
      
               <Link to="/create-category">
                  <i className='bx bxs-add-to-queue icon'></i>
                  <li className="li">Adicionar categorias</li>
               </Link>
      
               <Link to="/manange-categories">
                  <i className='bx bxs-edit icon'></i>
                  <li className="li">Gerenciar categorias</li>
               </Link>
               </div>
               
               <div className="menu-footer">
                  <div className="user">
                     <Link to="/profile">
                        <i className='bx bxs-user icon'></i>
                        <p className="user-name">{localStorage.getItem('name')}</p>
                        <p>{ranking}</p>
                     </Link>
                  </div>
                  <Link to="/">
                     <i onClick={logout} className='bx bx-log-out icon'></i>
                  </Link>
               </div>
              </ul>
    )
  }}, [])


console.log(localStorage.getItem('ranking'))
  useEffect(() => {
switch (localStorage.getItem('ranking')){
   case 1: 
   setRanking('chefe')
   break;
   case 2: 
   setRanking('adiministrador')
   break;
   case 3: 
   setRanking('usuário')
   break;
}
}, [])




    
    function logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      localStorage.removeItem('ranking')
  }



  /*return (
     <div className="teste">
        
        
        <br/>
        <ul id="menu">
         
<div>
   <h3 className="logo-menu">logo</h3>
   <div className="flex">

      <i  class='bx bx-menu icon' onClick={menu} ></i>
      <Link to="/">
      <li className="li dashbord">Dashbord</li>
</Link>
   </div>
         <Link to="/">
            <i className='bx bxs-home icon'></i>
            <li className="li">Home</li>
         </Link>

         <Link to="/create-prouct">
            <i className='bx bxs-add-to-queue icon'></i>
            <li className="li">Adicionar produtos</li>
         </Link>

         <Link to="/manange-product">
            <i className='bx bxs-edit icon'></i>
            <li className="li">Gerenciar produtos</li>
         </Link>

         <Link to="/">
            <i className='bx bxs-add-to-queue icon'></i>
            <li className="li">Adicionar categorias</li>
         </Link>

         <Link to="/">
            <i className='bx bxs-edit icon'></i>
            <li className="li">Gerenciar categorias</li>
         </Link>
         </div>
         
         <div className="menu-footer">
            <div className="user">
               <Link to="/profile">
            <i class='bx bxs-user icon'></i>
            <p className="user-name">{localStorage.getItem('name')}</p>
            </Link>
        </div>
            <Link to="/">
               <i onClick={logout} className='bx bx-log-out icon'></i>
            </Link>
         </div>
        </ul>
     </div>
    
  );*/
  return (
   <div className="teste">{menuShow}</div>
  )
}

export default MenuAdm;
