import React, {useState, useEffect} from 'react';
import './styles/Header.css';
import Category from './Category';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Header() {
  const url = 'http://10.0.0.104:8001'
  const [search, setSearch] = useState()

  function closeSearch(){
   setTimeout(() => {
     document.querySelector('.search-done').style.display = "none";
   }, 200);
  }

  async function handleSearchChange(e){
    if (e.target.value.length > 2){
      document.querySelector('.search-done').style.display = "block";
      await api
        .post("/search",{
            name: e.target.value
        })
        .then((response) =>  
        setSearch( response.data.map((search) =>
          <li className="search-li">
            <img  src={url + "/storage/" + search.photo_main}/>
            <Link to={`/product/${search.id}`}>  {search.product_name.slice(0,60)}</Link>
          </li>
        )))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }else{
        document.querySelector('.search-done').style.display = "none";
      }
  }

  return (
   <div>
    <header >
      <Link className="logo" to="/">
          <h2 className="logo">logo</h2>
      </Link>
      <div>
        <input className="search" onBlur={closeSearch} onChange={handleSearchChange} type="text" placeholder="pesquisar"/>
        <div className="search-done">
          {search}
        </div>
      </div>
      <div className="icons-header">
        <img className="icons-header" src="../../img/favorite.png" />
        <Link to="/cart">
          <img className="icons-header" src="../../img/cart.png" />
        </Link>
        <Link to="/profile">
          <img className="icons-header" src="../../img/profile.png" />
        </Link>
      </div>
    </header> 
    <Category />
  </div>
  );
}
export default Header;
