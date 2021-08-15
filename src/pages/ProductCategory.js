import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card,Button } from 'react-bootstrap';
//import './Home.css'
import api from "../services/api";
//import Category from "./Category";
import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";



function ProductCategory() {
  const url = 'http://10.0.0.104:8001'
  
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState()

  let { id } = useParams();

  useEffect(() => {
    api
      .get("/category/filter/"+id)
      .then((response) =>  setProduct(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    }, []);

    useEffect(() => {
      api
        .get("/category/name/"+id)
        .then((response) =>  setCategoryName(response.data.category_name))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }, []);

  

  console.log(product)
const listItems = product.map((product) =>
  <Card style={{ width: '12rem', height: '25rem', marginTop: '1rem' }}>
  <Card.Img variant="top" src={url+ "/storage/" + product.photo_main} />
  <Card.Body>
    <Card.Title style={{ width: '9rem', height: '4rem' }}>{product.product_name.slice(0, 30)}</Card.Title>
    <Card.Text style={{ width: '7rem', height: '2rem' }}>{product.product_description.slice(0, 40)}</Card.Text>
    <Link to={'/product/'+ product.id} >
    <Button variant="primary">ver mais</Button>
    </Link>
  </Card.Body>
</Card>
);

    

  return (
<main className="main">
  <h1 >{categoryName}</h1>
  <br/>
    <div className="">
        <div className="main-card">{listItems}</div>
    </div>
</main>
  );
}

export default ProductCategory;
