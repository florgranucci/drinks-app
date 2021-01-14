import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext'
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {

    const [search, setSearch] = useState({
        name: '',
        category: ''
    });

    //no props needed for this component...just use context
    const { categories } = useContext(CategoriesContext);
    const { findRecipe, setConsult } = useContext(RecipesContext);


    //function to read content
    const getData = e => {
  setSearch({
      ...search,
      [e.target.name]: e.target.value
  })
    }

    return ( 
        <form 
        className='col-12'
        onSubmit={e => {
            e.preventDefault();
            findRecipe(search);
            setConsult(true)
        }}
        
        >
            <fieldset className='text-center'>
                <legend>Search by Category or Ingredient</legend>
            </fieldset>

            <div className='row mt-4'>
              <div className='col-md-4'>
                  <input 
                  name='name'
                  className='form-control'
                  type='text'
                  placeholder='Search by Ingredient'
                  onChange = { getData }
                  />
              </div>
            <div className='col-md-4'>
                  <select 
                  className='form-control'
                  name='category'
                  onChange = { getData }
                  >
                  <option value=''>--- Select a Category ---</option>
                  {categories.map(c => (
                      <option 
                      key={c.strCategory}
                      value={c.strCategory}
                      >{c.strCategory}</option>
                  ))}
                  </select>
            </div>

            <div className='col-md-4'>
            <input
                  className='btn btn-block btn-primary'
                  type='submit'
                  value='Search Recipe'
                  />
            </div> 

          </div>
        </form>
     );
}
 
export default Form;