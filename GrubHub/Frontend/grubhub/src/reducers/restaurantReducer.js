import { RESTAURANT_DISPLAY } from '../actions/types';

const initialState = {
    itemsToDisplay : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case RESTAURANT_DISPLAY : 
            return {
                ...state,
                itemsToDisplay: payload
            };

        default :
            return state;
    }
}
