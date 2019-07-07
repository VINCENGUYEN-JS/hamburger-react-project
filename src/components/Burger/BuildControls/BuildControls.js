import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl.js';

const controls=[

    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
];

const buildControls=(props)=>{
    console.log("[BuildControls] render method");
    return (

        <div className={classes.BuildControls}>
            <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(
                (ele,index)=><BuildControl 
                key={index} 
                label={ele.label}
                added={()=>props.ingredientsAdded(ele.type)}
                deleted={()=>props.ingredientsDeleted(ele.type)}
                disabled={props.disabled[ele.type]}
                
                /> 
            )}
             <button className={classes.OrderButton} 
                    disabled={!props.purchasable}
                    onClick={props.ordered}>{props.isAuth? 'ORDER NOW' :'SIGN UP TO ORDER'}</button>
        </div>
       
    );
}

export default buildControls;