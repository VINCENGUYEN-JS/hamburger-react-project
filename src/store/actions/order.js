import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id ,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = ()=>{
    return {
        type : actionTypes.PURCHASE_BURGER_START,

    }
}

export const purchaseBurger =(orderData,token)=>
{   

    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then((res)=>{
            console.log(res.data);
          dispatch(purchaseBurgerSuccess(res.data.name,orderData));
        })
        .catch(err => {
            dispatch(purchaseBurgerFail(err));
            console.log(err);
        }
     
        );
    }
}

export const purchaseInit = ()=>{
    return {
        type: actionTypes.PURCHASE_INIT,
        
    }
}

export const fetchOrdersSuccess=(orders)=>{
    return {
        type:actionTypes.FETCH_OREDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail=(err)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:err
    }
}

export const fetchOrderStart=()=>{
    return {
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders=(token,userId)=> {
   return (dispatch)=>{
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+ queryParams)
        .then(
            res => {
               const fetchOrders=[];
               console.log('fetch Orders',res.data);
               for (let key in res.data){
                   fetchOrders.push(
                       {
                           ...res.data[key],
                           id:key
                       }
                       )
               }
               console.log(fetchOrders);
               dispatch(
                fetchOrdersSuccess(fetchOrders)
               );  
            }
        )
        .catch(err =>{
          dispatch(fetchOrdersFail(err));
        });
    }
}
