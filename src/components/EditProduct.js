import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/EditProduct.css'
import MenuAdm from '../components/MenuAdm'
import { Redirect, Link } from 'react-router'
import { Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";



function EditProduct() {
  const [product, setProduct] = useState()
  let { id } = useParams();

  // edit the product
  async function edit(){
      let name = document.getElementById('name').value
      let description = document.getElementById('description').value
      let value = document.getElementById('value').value
      const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
        await api
          .post("/product/edit/"+ id,{
        product_name: name,
        product_description: description,
        value: value
          } , config)
          .then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
          window.location.reload()
    }

    // 
  useEffect(() => {
      api
        .get("/product/"+id)
        .then((response) =>  setProduct(response.data.map((item) => 
        <tr>
        <td><textarea id="name">{item.product_name}</textarea></td>
        <td><textarea id="description">{item.product_description.slice(0,80)}</textarea></td>
        <td><input id="value" value={item.value} /></td>
        <td><button onClick={edit}  className="delete">salvar</button></td>
      </tr>
        )))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }, []);

      if (localStorage.getItem('token') == undefined){
          return <Redirect to="/login/" />
      }

  return (
     <main> 
        <MenuAdm />
        <br/>
        <Table className="table-edit" striped bordered hover>
          <thead>
            <tr>
              <th>nome</th>
              <th>descrição</th>
              <th>valor</th>
              <th>salvar</th>
            </tr>
          </thead>
          <tbody>
            {product}
          </tbody>
      </Table>
     </main>
    
  );
}

export default EditProduct;
