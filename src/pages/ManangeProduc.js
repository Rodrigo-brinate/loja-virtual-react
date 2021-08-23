import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/ManangeProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';


function ManangeProduct() {
  console.log(localStorage.getItem('token')) 
  const [product, setProduct] = useState()
  const [alertDelete, setAlertDelete] = useState()


  //get the products and stored in state
  useEffect(() => {
      api
        .get("/manangeProduct")
        .then((response) =>  setProduct(response.data.map((item) => 
        <tr>
          <td>{item.id}</td>
          <td>{item.product_name}</td>
          <td>{item.product_description.slice(0,80)}</td>
          <td>{item.value}</td>
          <td><Link to={'/edit/product/'+ item.id}><button className="edit">editar</button></Link></td>
          <td><button onClick={() => productDelete(item.id)} className="delete">excluir</button></td>
        </tr>
        )))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }, []);


async function Delete(id) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};
    await api
      .get("/product/delete/"+id , config)
      .then((response) => {
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
window.location.reload()
  
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
  

    function cancel() {
      setAlertDelete('')
    }


   async function searchCancel() {
   await api
    .get("/manangeProduct")
    .then((response) =>  setProduct(response.data.map((item) => 
    <tr>
      <td>{item.id}</td>
      <td>{item.product_name}</td>
      <td>{item.product_description.slice(0,80)}</td>
      <td>{item.value}</td>
      <td><Link to={'/edit/product/'+ item.id}><button className="edit">editar</button></Link></td>
      <td><button onClick={() => productDelete(item.id)} className="delete">excluir</button></td>
    </tr>
    )))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
    }

    /// search product
  async function serachTable(e){
      if (e.target.value.length > 2){
          await api
              .post("/search",{
                  name: e.target.value
              })
              .then((response) =>  
              setProduct( response.data.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_description.slice(0,80)}</td>
                <td>{item.value}</td>
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
         <input placeholder="pesquisar" onBlur={searchCancel} onChange={serachTable} className="search-table" />
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>nome</th>
              <th>descrição</th>
              <th>valor</th>
              <th>editar</th>
              <th>excluit</th>
            </tr>
          </thead>
          <tbody>
            {product}
          </tbody>
        </Table>
     </main>
  );
}
export default ManangeProduct;
