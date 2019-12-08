import { GET_PROFILE } from '../actions/types';

const initialState = {
    getProfile : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case GET_PROFILE : 
            return {
                ...state,
                getProfile: payload
            };

        default :
            return state;
    }
}