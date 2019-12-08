import { PLACE_ORDER } from './types';
import { GET_ACTIVE_ORDER } from './types';
import { GET_DELIVERED_ORDER } from './types';
import { GET_ORDERS_OWNER } from './types';
import { UPDATE_ORDER_STATUS } from './types';
import axios from 'axios';
import constants from '../config';

export const placeCheckedOrder = (data) => dispatch => {
    console.log('Checked order placement action called');
    axios.post(constants.apiUrl+'Restaurant/CheckoutOrders',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : PLACE_ORDER,
        payload : test
    })); 
};

export const getActiveOrders = (data) => dispatch => {
    console.log('active order action called');
    axios.post(constants.apiUrl+'Order/GetRecentOrderRequest',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_ACTIVE_ORDER,
        payload : test
    })); 
};

export const getDeliveredOrders = (data) => dispatch => {
    console.log('delivered order action called');
    axios.post(constants.apiUrl+'Order/GetDeliveredItems',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_DELIVERED_ORDER,
        payload : test
    })); 
};

export const getOwnerOrders = (data) => dispatch => {
    console.log('active owner order action called');
    axios.post(constants.apiUrl+'Order/RecentOrderReq',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_ORDERS_OWNER,
        payload : test
    })); 
};

export const updateOrderStatus = (data) => dispatch => {
    console.log('update order status action called');
    axios.post(constants.apiUrl+'Order/OrderStatusUpdate',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : UPDATE_ORDER_STATUS,
        payload : test
    })); 
};