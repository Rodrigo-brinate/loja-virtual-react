import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './Cart.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';



function Cart() {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    

    
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        api
          .get("/cart/"+ localStorage.getItem('id'),config)
          .then((response) =>  {
          setCart(response.data.map((product) =>
             <div className="flex mx-4 justify-between">
                 <img width="50px" src={"http://10.0.0.104:8001/storage/" + product.photo_main}/>
                 &nbsp;
                <p>{product.product_name}</p>
                &nbsp; &nbsp;
                <p className="">{product.value}</p>
            </div>
          ))
          
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });

          //////////////////////////////////////////////////

          /*api
          .get("/cart/"+ localStorage.getItem('id'),config)
          .then((response) =>  {
          response.data.map((product) =>
             setTotal(total += product.value)
          )
          
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });




*/

          /////////////////////////////////////////////////
        
      }, []);

      console.log(total)

     // console.log(cart[0].product_name)

  return (
     <main>
         {cart}
     </main>
    
  );
}

export default Cart;
