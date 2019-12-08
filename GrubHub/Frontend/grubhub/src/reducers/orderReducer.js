import { PLACE_ORDER } from '../actions/types';
import { GET_ACTIVE_ORDER } from '../actions/types';
import { GET_DELIVERED_ORDER } from '../actions/types';
import { GET_ORDERS_OWNER } from '../actions/types';
import { UPDATE_ORDER_STATUS } from '../actions/types';

const initialState = {
    itemsToOrder : {},
    ordersReceived : {},
    ordersDelivered : {},
    orderStatus : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case PLACE_ORDER : 
            return {
                ...state,
                itemsToOrder: payload
            };

        case GET_ACTIVE_ORDER : 
            return {
                ...state,
                ordersReceived: payload
            };

        case GET_DELIVERED_ORDER : 
            return {
                ...state,
                ordersDelivered: payload
            };

        case GET_ORDERS_OWNER : 
            return {
                ...state,
                ordersReceived: payload
            };

        case UPDATE_ORDER_STATUS : 
            return {
                ...state,
                orderStatus: payload
            };


        default :
            return state;
    }
}
