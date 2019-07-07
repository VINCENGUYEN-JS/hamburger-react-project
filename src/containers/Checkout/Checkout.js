import React , {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckoutSumarry/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    shouldComponentUpdate(){
        console.log("HAHA");
        return true;
    }
    // componentWillMount(){
    //     console.log(this.props);
    //     console.log(this.props.location.search);
    //     const query = new URLSearchParams(this.props.location.search);
    //     console.log(query);
    //     const ingredients = {};
    //     let price =0;
    //     for (let param of query.entries()){
    //         //['salad',1]
    //         if(param[0]==='price'){
    //             price = +param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
          

    //     }

    //     this.setState({
    //         ingredients:ingredients,
    //         totalPrice : price
    //     })


    // }


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let purchaseRedirect = null;
        if(this.props.purchased)
        {
            purchaseRedirect=<Redirect to="/" />
        }
        return (
            <div>
                {purchaseRedirect}
                <Route path={'/checkout' } exact
                render={
                    (props)=>(
                        <CheckOutSummary ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelHandler}
                        onCheckoutContinued={this.checkoutContinueHandler}
                        />
                    )
                }/>
              
                <Route path={this.props.match.url +'/contact-data' }
                // render={
                //     (props)=>(
                //         <ContactData ingredients={this.props.ings}
                //                     price ={this.state.totalPrice}
                //                     {...props}
                //         />
                //     )
                // }
                component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient ,
        purchased :state.orders.purchased
    }
}



export default connect(mapStateToProps)(Checkout);