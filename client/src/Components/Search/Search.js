import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/Actions/actions.js"





function Search() {

    const dispatch = useDispatch();
    const [input, setInput] = useState("");
  
    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
        dispatch(searchByName(e.target.value));
      }
  
    function handleSubmit(e) {
      try {
        dispatch(searchByName(input));
      } catch (error) {
        return error;
      }
  
      setInput("");
    }
  
    return (
      <div className="warp">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Busque Pais por el nombre"
            value={input}
            onChange={(e) => handleChange(e)}
          />
          
        </div>
      </div>
    );
  }

export default Search
