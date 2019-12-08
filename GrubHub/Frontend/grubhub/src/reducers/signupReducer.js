import { SIGNUP_BUYER } from '../actions/types';
import { SIGNUP_OWNER } from '../actions/types';

const initialState = {
    signUpBuyer : {},
    signUpOwner : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case SIGNUP_BUYER : 
            return {
                ...state,
                signUpBuyer: payload
            };

        case SIGNUP_OWNER : 
            return {
                ...state,
                signUpOwner: payload
            };

        default :
            return state;
    }
}