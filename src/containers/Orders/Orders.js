import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component  {

    componentDidMount(){
     console.log("COMPONENT DID MOUNT [ORDERS]");
      this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        // console.log(this.props.orders);
        let orders =<Spinner />;
        if(!this.props.loading){
            orders= <div>
                    {this.props.orders.map( order => (
                        <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                    ))}
                  </div>
        }
        return orders;
        
       

    }



}

const mapDispatchToProps = (dispatch)=>{
    return {
      onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}

const mapStateToProps = (state)=>{
    return {
        orders :state.orders.orders,
        loading :state.orders.loading,
        token :state.auth.token,
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);