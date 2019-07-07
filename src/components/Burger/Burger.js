import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js';



const burger = (props)=>{
    let transformIngredients = Object.keys(props.ingredients).map( (igKey)=>{
         return  [...Array(props.ingredients[igKey])].map((_,index)=>{
              return  <BurgerIngredients key={index+igKey} type={igKey}></BurgerIngredients>
         });
    }).reduce( (arr,ele)=>{
        return arr.concat(ele);
    },[])
    console.log(transformIngredients);
    if(transformIngredients.length===0){
        transformIngredients=<p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );

};

export default burger;