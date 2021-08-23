import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card,Button } from 'react-bootstrap';
import './styles/Home.css'
import api from "../services/api";
import Category from "../components/Category";
import { Link } from 'react-router-dom';
import Header  from "../components/Header";


function Home() {
  const url = 'http://10.0.0.100:8001'
  const [product, setProduct] = useState([]);
 
  /// search the products and store the datas in state product
  useEffect(() => {
    api
      .get("/")
      .then((response) =>  setProduct(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  
  const listItems = product.map((product) =>
    <Card style={{ width: '12rem', height: '25rem', marginTop: '1rem' }}>
      <Card.Img variant="top" src={url+ "/storage/" + product.photo_main} />
      <Card.Body>
        <Card.Title style={{ width: '9rem', height: '4rem' }}>{product.product_name.slice(0, 30)}</Card.Title>
        <Card.Text style={{ width: '7rem', height: '3rem' }}>{product.product_description.slice(0, 40)}</Card.Text>
        <Link to={'/product/'+ product.id} >
        <Button variant="primary">ver mais</Button>
        </Link>
      </Card.Body>
    </Card>
  );
  return (
     <main className="main">
       <Header />
      <div className="">
        <img className="d-block w-100 mt-4" src="https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg" alt="First slide" />
        <div className="main-card">{listItems}</div>
      </div>
     </main>
  );
}

export default Home;
