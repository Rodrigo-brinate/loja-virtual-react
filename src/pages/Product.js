import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './Product.css'
import { Carousel, Card,Button } from 'react-bootstrap';

import { Redirect } from 'react-router'
import {useParams} from "react-router-dom";



 function Profile() {
    //console.log(localStorage.getItem('token')) 
    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])
    const [comment, setComment] = useState()
    const [clacification, setClacification] = useState()
    const [showComent, setShowComent] = useState()

    let { id } = useParams();
    
/// busca os produtos e suas imagens
    useEffect(() => {
        api
          .get("/product/"+id)
          .then((response) => {
              console.log(response.data)
            setImages(response.data.map((product) =>
                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100"src={"http://10.0.0.104:8001/storage/" + product.image}alt="First slide"/>
                    </Carousel.Item>
              ))
           setProduct(response.data[0])
           })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);


      //// busca os comentarios
      useEffect(() => {
        api
          .get("/product/comment/view/"+id)
          .then((response) => {
            console.log(response.data[0].name)
          setShowComent(response.data.map((product) => 
            
          <div className="mx-auto comment  ">
              <div className="flex">
                  <img width="20px" height="20px" src="../img/profile.png"/>&nbsp;
                  <p className="block">{product.name}</p>
             </div>
              <br/>
    <div className="flex body-comment">
            <div>
                <p className="">{product.comment}</p>
            </div>

            <div className="clacification">
                <p >{product.clacification}</p> &nbsp;<img width="32px" className="clacification"  src="../img/star-selected.png" />
            </div>
    </div>
             <br/>
             
            </div>
           
    
        ))
           //console.log(response.data)
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);




    function handleClacification(e) {
        setClacification(e.target.value);
        console.log(e.target.value)
     }


     function handleComent(e) {
        setComment(e.target.value);
        console.log(e.target.value)
     }


//// registra um comentário
    async function handleSubmit(){
//console.log(comment)
//console.log(product.product_id)

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    await  api
          .post("/product/comment",{
                user_id: localStorage.getItem('id'),
                id: product.product_id,
                comment: comment,
                clacification: clacification
        },
        config
        )
          .then((response) =>{  console.log(response.status)
           if(response.status == 200){
              window.location.reload()
          }/*else{
              window.location.href('http://10.0.0.104:3000/login')
          }
        
        */
        }
          )
         
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            alert('não foi possivel registrar seu comentario faça login ou cadastre-se e tente novamente')
            window.location.href = 'http://10.0.0.104:3000/login'
          });
         // console.log(localStorage.getItem('token'))  
         //window.location.reload()      

}



    //  console.log(images)
//console.log(product.id)
var title = product.product_name
var description = product.product_description
//console.log(description)
//console.log('description')



  return (
     <main>
<Carousel> 
    {images}
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src={"http://10.0.0.104:8001/storage/" + product.image}
      alt="First slide"
    />
    
  </Carousel.Item>
</Carousel>

<h2 className="title">{title}</h2>
<button className="checkout">comprar</button>
<button className="cart">adicionar ao carrinho</button>


<p className="description">{description}</p>


<h1 className="w-max mx-auto d-block  mt-5">comentários</h1>


<div className="mx-auto d-block w-max">
    <textarea onChange={handleComent} placeholder="digite um comentario" className="mx-auto d-block w-max px-4" ></textarea>

    <select onChange={handleClacification} className="mx-auto d-block w-max mt-2 px-2">
        <option>clascifique o produto</option>
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
    </select>

    <button onClick={handleSubmit} className="mx-auto  d-block w-max mt-2 px-2">comentar</button>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

{showComent}

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

     </main>
    
  );
}

export default Profile;
