import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/CreateProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'

function CreateProduct() {
    const [name, setName] = useState()
   

   useEffect(() => {
      api
         .get("/category")
         .then((response) =>  setCategories(response.data.map((product) =>
            <option value={product.id}>{product.category_name}</option>
         )))
         .catch((err) => {
         console.error("ops! ocorreu um erro" + err);
         });
   }, []);


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


  function handleSubmit(){
     
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data" }
    };
       api
          .post("/adm/create-category",{
                name: name
          },config
        )
          .then((response) =>{  console.log(response.status)
           if(response.status == 200){
              window.location.reload()
          }})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          //  alert('não foi possivel registrar seu comentario faça login ou cadastre-se e tente novamente')
            window.location.href = 'http://10.0.0.104:3000/login'
          });
         // console.log(localStorage.getItem('token'))  
         //window.location.reload()      

   }
  return (
     <main>
         <MenuAdm  />
         
         <div className="form"><h1>Adicionar produto</h1>
            <input onChange={handleName} name="name" placeholder="digite o nome do produto" type="text" />
            <input onChange={handleDescription} name="description" placeholder="digite a descrição do produto" type="text" />
            <select name="category" onChange={handleCategory}>
                <option>selecione a categoria do produto</option>
                {categories}
            </select>
            <input onChange={handlePhoto_main} name="photo_main" placeholder="digite a descrição do produto" type="file" />
            <input onChange={handlevalue} name="value" placeholder="digite o valor do produto" type="number" />
            <button className="create" onClick={handleSubmit} >adicionar produto</button>
         </div>
     </main>
    
  );
}

export default CreateProduct;
