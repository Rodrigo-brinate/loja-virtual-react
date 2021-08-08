import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card,Button } from 'react-bootstrap';
import './Home.css'
import api from "../services/api";
import { Link } from 'react-router-dom';


function Home() {
  
  const [product, setProduct] = useState([]);

 
  useEffect(() => {
    api
      .get("/")
      .then((response) =>  setProduct(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    
  }, []);
  

  console.log(product)
const listItems = product.map((product) =>

  <Card style={{ width: '12rem', height: '25rem' }}>
  <Card.Img variant="top" src={"http://10.0.0.104:8001/storage/" + product.photo_main} />
  <Card.Body>
    <Card.Title>{product.product_name.slice(0, 30)}</Card.Title>
    <Card.Text>{product.product_description.slice(0, 40)}</Card.Text>
    <Link to={'/product/'+ product.id} >
    <Button variant="primary">ver mais</Button>
    </Link>
  </Card.Body>
</Card>
);
//console.log(listItems)

    

  return (
   
     <main>

<Carousel className="carrosel-home">
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg"
      alt="Second slide"
    />
   
  </Carousel.Item>
  <Carousel.Item interval={3000}>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2017/11/29/13/28/a-discount-2986181_960_720.jpg"
      alt="Third slide"
    />
   
  </Carousel.Item>
</Carousel>



<h1>{listItems}</h1>



     </main>
    
  );
}

export default Home;
