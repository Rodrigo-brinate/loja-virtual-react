import './styles/Seach.css'
import api from "../services/api";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function Seach() {
  const [search, setSearch] = useState()

  function handleSearchChange(e){
    useEffect(() => {
      api
        .post("/search",{
            name: e.target.value
        })
        .then((response) =>  
        setSearch( response.data.map((search) =>
          <Link to={`/category/filter/${search.id}`}>
            <li className="li">{search.category_name}</li>
          </Link>
        )))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      
    }, []);
  }

  return (
  <div>
    <h6 className="category-title">Categorias</h6>
      <ul className="list-category">
        {search} 
      </ul>
    </div>
  );
}

export default Seach;
