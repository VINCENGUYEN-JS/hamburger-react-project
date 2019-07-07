import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state={
        orderForm:{
                name:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                street:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                zip:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP CODE'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touch:false
                },
                country:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                email:{
                    elementType: 'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your-Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig:{
                        options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapeast'}
                        ]
                    },
                    validation:{},
                    valid:true,
                    value: "fastest",
                   
                },
        },
        formIsValid:false
    } ;

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

    orderHandler = (event) =>{
        event.preventDefault();
           //  alert('You Continue!');
       const formData = {};
       for (let formElementIdentifier in this.state.orderForm)
       {
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
       }
       const order = {
           ingredients:this.props.ings,
           price : this.props.price,
           orderData : formData,
           userId: this.props.userId
       }
       console.log(order);
       this.props.onOrderBurger(order,this.props.token);
       console.log("Setting order object [BurgerBuilder]");
    
    }

    inputChangedHandler= (event,inputIdentify) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentify]
        }
        updatedFormElement.value=event.target.value;

        updatedFormElement.valid= this.checkValidity(updatedFormElement.value,
            updatedFormElement.validation
            )
        updatedFormElement.touch=true;
        
        // console.log(updatedFormElement);
        
        //We need to update the inputChangedHandler method
        // so we can loop through all form controls valid status,
        // and when valid, update the formIsValid status to true.
        let formIsValid = true ;
        for (let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
            // console.log(inputIdentify,updatedOrderForm[inputIdentifiers].valid);
            // console.log(formIsValid);
        }


        updatedOrderForm[inputIdentify]=updatedFormElement;

        this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValid
        });
    }   

    render(){

        let formElementsArray = [];
        for (let key in this.state.orderForm ){
                formElementsArray.push(
                    {   
                        id :key,
                    //     elementType : this.state.orderForm[key].elementType,
                    //     elementConfig : {...this.state.orderForm[key].elementConfig},
                    //     varlue : this.state.orderForm[key].value
                    // }    
                        config : this.state.orderForm[key]
                    }
                )

        }

        let form = (
            <form onSubmit={this.orderHandler}>
            {
                formElementsArray.map( (formElement)=>{
                    return <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value ={formElement.config.value}
                                valueType={formElement.id}
                                invalid ={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touch}
                                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                })
            }
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order </Button>
          </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}> 
                <h4>Enter your Contact Contact Data</h4>
                        {form}
            </div>
        )
    }



}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredient,
        price :state.burgerBuilder.totalPrice,
        loading :state.orders.loading,
        token :state.auth.token,
        userId :state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);