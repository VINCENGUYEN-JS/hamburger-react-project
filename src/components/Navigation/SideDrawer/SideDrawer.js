import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/Backdrop';
import Aux from '../../../hoc/Auxillary';
const sideDrawers = (props)=>{
    let attachClasses = [classes.SideDrawer,classes.Close];
    if(props.show){
       attachClasses=[classes.SideDrawer,classes.Open];
    }
    return (
            <Aux>
            
                <BackDrop show={props.show} clicked={props.closed}/>
           
            {/* <div className={classes.SideDrawer} style={{
                transform : props.show ? "translateX(0)" : "translateX(-100%)"
            }}> */}
            <div className={attachClasses.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
            </Aux>
            
    );
}

export default sideDrawers;