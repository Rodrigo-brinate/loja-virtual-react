import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter } from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './pages/Profile';
import Login from './pages/Login'
import Product from './pages/Product'
import Register from './pages/Register';
import Cart from './pages/Cart'
import ProductCategory from './pages/ProductCategory';
import CreateProduct from './pages/CreateProduct';
import ManangeProduct from './pages/ManangeProduc';
import EditProduct from './components/EditProduct';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  
    <BrowserRouter>
    <Header />
    <Route component = { Home }  path="/" exact />
    <Route component = { Profile }  path="/profile" exact />
    <Route component = { Login }  path="/login" exact />
    <Route component = { Product }  path="/product/:id" exact />
    <Route component = { Register }  path="/register" exact />
    <Route component = { Cart }  path="/cart" exact />
    <Route component = { CreateProduct }  path="/create-prouct" exact />
    <Route component = { ProductCategory }  path="/category/filter/:id" exact />
    <Route component = { ManangeProduct }  path="/manange-product" exact />
    <Route component = { EditProduct }  path="/edit/product/:id" exact />


    </BrowserRouter>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
