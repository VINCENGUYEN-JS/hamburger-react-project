import React,{Component} from 'react';
import Aux from '../../hoc/Auxillary';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import axios from '../../axios-order';
import BuildControl from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component{

    constructor(props){
        super(props);
    }
    state={
        purchasable:false,
        purchasing:false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState=(updatedIngredients)=>{
        //const ingredients={...this.props.ings}
        const ingredients = {...updatedIngredients};
        const sum=Object.keys(ingredients).map((igKey)=>{
           return ingredients[igKey];
        }
        ).reduce((totalIngredients,currentValue)=>{
            totalIngredients+=currentValue;
            return totalIngredients;
        },0);
        return sum > 0 


    }

    //   removeIngredientHandler=(type)=>{
    //    let oldCount=this.props.ings[type];
    //    if(oldCount<=0){
    //        return;
    //    }
    //    const updatedCount=oldCount-1;
    //    const updatedIngredients={...this.props.ings};
    //    updatedIngredients[type]=updatedCount;
    //    const priceDeduction = INGREDIENT_PRICES[type];
    //    const oldPrice=this.props.totalPrice;
    //    const newPrice=oldPrice-priceDeduction;
    //    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //    this.updatePurchaseState(updatedIngredients);


    //      }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true});
        }
        else
        {   
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    }

    // addIngredientHandler=(type)=>{
    // let oldCount=this.props.ings[type];
    // let updatedOldCount=++oldCount;
    // const updatedIngredients={...this.props.ings};
    // updatedIngredients[type]=updatedOldCount;
    // const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.props.totalPrice;
    // const newPrice=oldPrice+priceAddition;
    // this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    // this.updatePurchaseState(updatedIngredients);
    // }



    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
  
            
    //    console.log("Sending request [BurgerBuilder]");
        // const queryParams = [];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+ '=' +
        //     encodeURIComponent(this.props.ings[i]));
        // }
        // const queryParams=Object.keys(this.props.ings).map( (igKey)=>{
        //     return encodeURIComponent(igKey) + '=' + encodeURIComponent(this.props.ings[igKey])
        // }
        // )
        // queryParams.push('price' +'=' + this.props.totalPrice);
        // console.log(queryParams);
        // const queryString = queryParams.join('&');
        // console.log(queryString);
        // this.props.history.push(
        //     {
        //         pathname:'/checkout',
        //         search: '?' + queryString
        //     }
        // );
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }


    render(){
        
      
        let orderSummary = null;
    
       
        
        // disableInfo={
        //    salad:true,
        //    cheese:false,
        //    meat:true
        // }
        let burger =this.props.error ?   <p>Ingredients can't be loaded </p>:<Spinner/>
        
        if(this.props.ings){
            const disabledInfo = {...this.props.ings};
            Object.keys(disabledInfo).forEach( igKey=> {
                disabledInfo[igKey]=disabledInfo[igKey] <=0
            });    
            burger =  (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControl 
                    price={this.props.price}
                    ingredientsAdded={this.props.onIngredientAdded} 
                    ingredientsDeleted={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} 
                    isAuth={this.props.isAuthenticated}
                    />
                </Aux>
                     );

                     
               orderSummary= <OrderSummary 
                     ingredients={this.props.ings}
                     purchaseCancel={this.purchaseCancelHandler}
                     purchaseContinue={this.purchaseContinueHandler} 
                     price={this.props.price}
                  />;
                
         }

         if(this.state.loading){
            orderSummary = <Spinner></Spinner>;
        }
  
      
        return (
           <Aux>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
               </Modal>
                {burger}
           </Aux>
        );
    }




}

const mapStateToProps = (state) =>{
    return {
        ings : state.burgerBuilder.ingredient,
        price :state.burgerBuilder.totalPrice,
        error :state.burgerBuilder.error,
        isAuthenticated :state.auth.token!=null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded :(ingName)=>dispatch(
            actions.addIngredient(ingName)
        ),
        onIngredientRemoved :(ingName)=>dispatch(
           actions.removeIngredient(ingName)
        ),
        onInitIngredients :()=>dispatch(
            actions.initIngredients()
        ),
        onInitPurchase : ()=>dispatch(actions.purchaseInit()),
        onSetRedirectPath :(path)=>dispatch(actions.setAuthRedirectPath(path))
            
        }
    }


export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);