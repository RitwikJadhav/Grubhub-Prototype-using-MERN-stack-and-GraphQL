import { SECTION_ADD } from '../actions/types';
import { SECTION_REMOVE } from '../actions/types';

const initialState = {
    sections : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case SECTION_ADD : 
            return {
                ...state,
                sections: payload
            };

        case SECTION_REMOVE : 
            return {
                ...state,
                sections: payload
            };

        default :
            return state;
    }
}