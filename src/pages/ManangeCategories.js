import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/ManangeProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';


function ManangeCategories() {
  console.log(localStorage.getItem('token')) 
  const [category, setCategory] = useState();
  const [alertDelete, setAlertDelete] = useState();


  //get the products and stored in state
  useEffect(() => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}};
      api
        .post("/manangeCategory",{
          id: localStorage.getItem('id'),
          email: localStorage.getItem('email')
        },config)
        .then((response) =>  setCategory(response.data.map((item) => 
        <tr>
          <td>{item.id}</td>
          <td>{item.category_name}</td>
          
          <td><Link to={'/edit/product/'+ item.id}><button className="edit">editar</button></Link></td>
          <td><button onClick={() => productDelete(item.id)} className="delete">excluir</button></td>
        </tr>
        )))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }, []);


      async function Delete(id){
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        await api
          .get("/category/delete/"+id , config)
          .then((response) => {
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    window.location.reload()

      }

     async function cancel() {


        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}};
        await  api
            .post("/manangeCategory",{
              id: localStorage.getItem('id'),
              email: localStorage.getItem('email')
            },config)
            .then((response) =>  setCategory(response.data.map((item) => 
            <tr>
              <td>{item.id}</td>
              <td>{item.category_name}</td>
              
              <td><Link to={'/edit/product/'+ item.id}><button className="edit">editar</button></Link></td>
              <td><button onClick={() => productDelete(item.id)} className="delete">excluir</button></td>
            </tr>
            )))
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
         
        
      }

      // delete a product
   async function productDelete(id){
      setAlertDelete(
        <div className="alert-delete">
            <p>você realmente deseja apagar esse produto</p>
          <p>OBS: todos produtos dessa categorias serão apagados</p>
          <div className="flex justfy-between"><button onClick={cancel}>cancelar</button><button  onClick={() => Delete(id)}>ok</button></div>
        </div>
      )
    }


    function searchClose() {
      setCategory()
    }

    /// search product
  async function serachTable(e){
      if (e.target.value.length > 1){
          await api
              .post("/searchCategory",{
                  name: e.target.value
              })
              .then((response) =>  
              setCategory( response.data.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.category_name}</td>
                <td><button onClick={() => productDelete(item.id)} className="edit">editar</button></td>
                <td><button className="delete">excluir</button></td>
            </tr>
        )))
              .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
              });
            }
          }
    if (localStorage.getItem('token') == undefined){
        return <Redirect to="/login/" />
    }
    
  return (
     <main>
         <MenuAdm />
         {alertDelete}
         <input placeholder="pesquisar" onBlur={cancel} onChange={serachTable} className="search-table" />
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>nome</th>
            
              <th>editar</th>
              <th>excluit</th>
            </tr>
          </thead>
          <tbody>
            {category}
          </tbody>
        </Table>
     </main>
  );
}
export default ManangeCategories;
