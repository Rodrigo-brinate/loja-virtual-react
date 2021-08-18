import './styles/Category.css'
import api from "../services/api";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function Category() {
  const [category, setCategory] = useState()

  useEffect(() => {
    api
      .get("/category")
      .then((response) =>  
      setCategory( response.data.map((category) =>
      <Link to={`/category/filter/${category.id}`}>
        <li className="li">{category.category_name}</li>
        </Link>
    )))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
  <div>
    <h6 className="category-title">Categorias</h6>
    <ul className="list-category">
       {category} 
    </ul>
  </div>
  );
}

export default Category;
