import React,{Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxillary';
import BackDrop from '../BackDrop/Backdrop';
class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){

        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
            return true;
        }
        else 
            return false;

    }

    componentDidUpdate(){
        console.log('[Modal] Did Update');
    }
    render(){
        return (
            <Aux>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div style={{
                transform:this.props.show ?  'translateY(0)' :'translateY(-100vh)',
                opacity:this.props.show ? '1' :'0'
            }}
            className={classes.Modal}>
             {this.props.children}
            </div>
        </Aux>
        )
       
    }


    
}
    
    


    
  
    

export default Modal;