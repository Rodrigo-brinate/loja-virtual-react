import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../services/api";
import './styles/Cart.css'




function Cart() {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

  // delete item of cart of user
    async function cartRemove(id){
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        await api
          .get("/remove/cart/"+localStorage.getItem('id')+ "/" +id , config)
          .then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    window.location.reload()
    }

    //  get the elements of cart of user
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
      }, []);
  return (
     <main>
         {cart}
     </main>
  );
}

export default Cart;
