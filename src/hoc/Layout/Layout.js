import React,{Component} from 'react';
import Aux from '../Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {

    state={
        showSideDrawer:false
    }

    sideDrawClosedHandler = ()=>{
        this.setState(
            {showSideDrawer:false}
        );
    }

    sideDrawerToggleHandler =()=>{
        this.setState( (prevState)=>{
            return {showSideDrawer :!prevState.showSideDrawer}
        } );
    }

    render(){
            return (
                    <Aux>
                        <Toolbar 
                        drawerToggleClicked={this.sideDrawerToggleHandler}
                        isAuth={this.props.isAuthenticated}
                        />
                        <SideDrawer 
                        isAuth={this.props.isAuthenticated}
                        show={this.state.showSideDrawer} 
                        closed={this.sideDrawClosedHandler}/>
                        <main className={classes.Content}> 
                            {this.props.children}
                        </main>
                    </Aux>
                   
        
            )
        
    }

}

const mapStateToProps= state =>{
    return {
        isAuthenticated: state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);