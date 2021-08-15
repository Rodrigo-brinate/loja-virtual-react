import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './Cart.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';



function Cart() {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    

    async function cartRemove(id){

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
     
        await api
          .get("/remove/cart/"+localStorage.getItem('id')+ "/" +id , config)
          .then((response) => {
            console.log(response.data)
         
           //console.log(response.data)
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    window.location.reload()
    
    }

    
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        api
          .get("/cart/"+ localStorage.getItem('id'),config)
          .then((response) =>  {
          setCart(response.data.map((product) =>
             <div className="flex cart-page mx-4">
                 <img className="cart-img" src={"http://10.0.0.104:8001/storage/" + product.photo_main}/>
                 &nbsp;
                <p className="cart-name">{product.product_name.slice(0,80)}</p>
                &nbsp; &nbsp;
                <img className="cart-delete" src="../img/delete.png" onClick={() => cartRemove(product.id)}/>
                &nbsp;
                <p className="cart-value">{product.value}</p>
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
