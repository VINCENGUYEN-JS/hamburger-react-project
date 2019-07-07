import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';


 class Auth extends Component {

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:
                {   
                    type:'email',
                    placeholder:'Email Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                    minLength:6
                },
                valid:false,
                touched:false   
            },
            password:{
                elementType:'input',
                elementConfig:
                {   
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false   
            }
        },
        isSignUp:true
    }   

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirect !=='/'){
            this.props.onSetRedirectPath();
        }
    }

    checkValidity = (value,rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }


        return isValid;

    }

    switchAuthModeHandler=()=>{
        this.setState(
            {isSignUp:!this.state.isSignUp}
        )
    }
    submitHandler=(event)=>{
        event.preventDefault();
        console.log(this.state.isSignUp);
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        console.log("IM HERE SUBMIT HANDLER");
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControl = {...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControl})
    }

    render() {
        const formElementsArray=Object.keys(this.state.controls).map(
            (objKey)=>{
               return {
                config:this.state.controls[objKey],
                id:objKey} 
            }
        );
        let form = formElementsArray.map(
            (formElement)=>   
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value ={formElement.config.value}
                valueType={formElement.id}
                invalid ={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                 />


            
        );

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            )
        }


        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup)=>dispatch(action.auth(email,password,isSignup)),
        onSetRedirectPath :()=>dispatch(action.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state=> {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirect:state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);