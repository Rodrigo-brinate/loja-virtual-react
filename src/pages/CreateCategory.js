import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/CreateProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'

function CreateCategory() {
    const [name, setName] = useState();
    const [response, setResponse] = useState()
   

  
   useEffect(() => {
      const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      api
      .get("/cart/"+ localStorage.getItem('id'),config)
      .then((response) =>  console.log(response))
      .catch((err) => {
         console.error("ops! ocorreu um erro" + err);
         console.log(err)
         if (err){
         return window.location.href = "http://10.0.0.104:3000/login"      }
      });
   }, []); 

   if (localStorage.getItem('token') == undefined){
      return <Redirect to="/login/" />
   }

   function handleName(e) {
      setName(e.target.value);
      console.log(e.target.value)
   }


 async function handleSubmit(){
     
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}};
    await   api
          .post("/adm/create-category",{
                name: name,
                id: localStorage.getItem('id'),
                email: localStorage.getItem('email')
          },config
        )
          .then((response) =>{  console.log(response.status)
           if(response.status == 200){
            //  window.location.reload()
            setResponse(
               <div className={response.data.res}>
              { response.data.response}
               </div>
               )
          }})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          //  alert('não foi possivel registrar seu comentario faça login ou cadastre-se e tente novamente')
            //window.location.href = 'http://10.0.0.104:3000/login'
          });
         // console.log(localStorage.getItem('token'))  
         //window.location.reload()      

   }
  return (
     <main>
         <MenuAdm  />
         
         <div className="form">
            
            <h1>Adicionar produto</h1>
            <div>{response}</div>
            <input onChange={handleName} name="name" placeholder="digite o nome da categoria" type="text" />
            <button className="create" onClick={handleSubmit} >adicionar produto</button>
         </div>
     </main>
    
  );
}

export default CreateCategory;
