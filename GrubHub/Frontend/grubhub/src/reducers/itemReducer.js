import { ITEM_ADD } from '../actions/types';
import { ITEM_REMOVE } from '../actions/types';
import { ITEM_DISPLAY } from '../actions/types';
import { ITEM_GET } from '../actions/types';
import { ITEM_UPDATE } from '../actions/types';

const initialState = {
    items : {},
    itemUpdated : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case ITEM_ADD : 
            return {
                ...state,
                items: payload
            };

        case ITEM_REMOVE : 
            return {
                ...state,
                items: payload
            };

        case ITEM_DISPLAY : 
            return {
                ...state,
                items: payload
            };

        case ITEM_GET : 
            return {
                ...state,
                items: payload
            };

        case ITEM_UPDATE : 
            return {
                ...state,
                itemUpdated: payload
            };

        default :
            return state;
    }
}