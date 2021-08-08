import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

function Header() {
  return (
   
      <header  >
        <Link className="logo" to="/">
<h2 className="logo">logo</h2>
</Link>
<input className="search" type="text" placeholder="pesquisar"/>

<div className="icons-header">
    <img className="icons-header" src="../img/favorite.png" />
    <Link to="/cart">
    <img className="icons-header" src="../img/cart.png" />
    </Link>
    <Link to="/profile">
    <img className="icons-header" src="../img/profile.png" />
    </Link>
</div>
      </header>
    
  );
}

export default Header;
