import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/CreateProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'

function CreateProduct() {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [photo_main, setPhoto_main] = useState([])
    const [images, setImages] = useState([])
    const [value, setValue] = useState()
    const [categories, setCategories] = useState()


    // serch the cartegoryes from the select in form
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


   // uses the route cart of backand from veryfi if the token is valid
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


   //verify if the token jtw exists in localstorage
   if (localStorage.getItem('token') == undefined){
      return <Redirect to="/login/" />
   }

   //save the value of field name
   function handleName(e) {
      setName(e.target.value);
      console.log(e.target.value)
   }

   //save the value of field description
   function handleDescription(e) {
      setDescription(e.target.value);
      console.log(e.target.value)
   }

   //save the value of field category
   function handleCategory(e) {
      setCategory(e.target.value);
      console.log(e.target.value)
   }

   //save the value of field photo main
   function handlePhoto_main(e) {
      setPhoto_main(e.target.files[0]);
      console.log(e.target.files[0])
   }

/* function handleimages(e) {
    //setImages(e.target.files);
    console.log(e.target.files)
  //  e.target.files.map((product) => 
  var a = []
    Object.keys(e.target.files).forEach((key) => 
    //console.log(e.target.files[key])
      a.push(e.target.files[key])
    )
    setImages(a)
    console.log(images)
 }*/


   // get the value of field value
   function handlevalue(e) {
      setValue(e.target.value);
      console.log(e.target.value)
   }
      /// upload of datas
  function handleSubmit(){
     // uses the form data from upload of photo
     let formData = new FormData()
     formData.append('photo_main', photo_main)
     console.log(categories[0].props.value)
     formData.append('name', name)
     formData.append('description', description)
     formData.append('category', category)
     images.forEach((item) => {
      formData.append('image[]', item)
     })

     formData.append('value', value)
     formData.append('id', localStorage.getItem('id'))

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data" }
    };
       api
          .post("/amd/create-product", formData,config
        )
          .then((response) =>{  console.log(response.status)
           if(response.status == 200){
              window.location.reload()
          }})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            window.location.href = 'http://10.0.0.104:3000/login'
          });
          

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
