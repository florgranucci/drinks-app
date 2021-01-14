import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
const Recipe = ({recipe}) => {

    //Modal configuration
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    //get context values
    const { setidRecipe, info, setrecipe } = useContext(ModalContext);
    

    //function that shows the ingredients
    const showIngredients = info => {
      let ingredients = [];
      for(let i = 1; i < 16; i++){
          if( info[`strIngredient${i}`] ) {
              ingredients.push(
                  <li> { info[`strIngredient${i}`] }  { info[`strMeasure${i}`] }</li>
              )
          }
      }

      return ingredients;
  }


    return ( 
        <div className='col-md-4 mb-3'>
          <div className='card'>
           <h2 className='card-header'>
               {recipe.strDrink}
           </h2>
           <img className='card-img-top' src={recipe.strDrinkThumb} alt={`Imagen de ${recipe.strDrink}`}/>
           <div className='card-body'>
               <button
                   onClick={() => {
                       setidRecipe(recipe.idDrink);
                       handleOpen();
                   }}
                   type='button'
                   className='btn btn-block btn-primary'
                >See recipe</button>
                <Modal
                open={open}
                onClose={() => {
                  setidRecipe(null);
                  setrecipe({});
                  handleClose();
                }}
                >
                    <div style={modalStyle} className={classes.paper}>
                      <h2>{info.strDrink}</h2>
                      <h3 className='mt-4'>Instructions</h3>
                      <p>{info.strInstructions}</p>
                      <img className='img-fluid' src={info.strDrinkThumb} />
                      <h3>Ingredients:</h3>
                      <ul>
                        { showIngredients(info) }
                      </ul>
                    </div>
                </Modal>
               
           </div>
          </div>
        </div>
     );
}
 
export default Recipe;