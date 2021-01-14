import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    //Provider state
    const [idRecipe, setidRecipe] = useState(null);
    const [info, setrecipe] = useState({});

    //api call to show details
    useEffect(() => {
        const getRecipe = async () => {
          if(!idRecipe) return;
              const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

              const result = await axios.get(url);
              setrecipe(result.data.drinks[0]);
          
        }
        getRecipe();
    }, [idRecipe])

    return ( 
        <ModalContext.Provider
        value={{
            setrecipe,
            setidRecipe, 
            info
        }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
