import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const addIngredient=(ingredientName)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const removeIngredient=(ingredientName)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
}
export const fetchingIngredientsFail=()=>{
     return {
         type:actionTypes.FETCH_INGREDIENTS_FAIL
     }
}

export const initIngredients=()=>{
    return dispatch=>{
            axios.get('https://react-my-burger-fd7cc.firebaseio.com/ingredients.json')
            .then(res=>{
              dispatch(
                setIngredients(res.data)
              )
            })
            .catch(error=>{
              dispatch(
                fetchingIngredientsFail()
              )
            })
    };
}