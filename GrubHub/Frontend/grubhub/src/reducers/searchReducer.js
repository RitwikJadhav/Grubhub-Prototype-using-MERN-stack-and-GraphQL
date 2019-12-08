import { SEARCH_ITEM } from '../actions/types';

const initialState = {
    itemsToSearch : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case SEARCH_ITEM : 
            return {
                ...state,
                itemsToSearch: payload
            };

        default :
            return state;
    }
}
