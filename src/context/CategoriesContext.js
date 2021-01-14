import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Create context

export const CategoriesContext = createContext();

//Always create a Provider where we can find functions and states
const CategoriesProvider = (props) => {
    //Create context's state
    const [categories, setCategories] = useState([])
    
    //API
    useEffect(() => {
       const getCategories = async () => {
           const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
           const categories = await axios.get(url);
           setCategories(categories.data.drinks)
       }
       getCategories();
    }, [])
    return (
      <CategoriesContext.Provider
         value={{
             categories
         }}
      >
          {/* all components are inside the props.children */}
          {props.children}
      </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;