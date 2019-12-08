import { LOGIN_REQ } from '../actions/types';

const initialState = {
    loginUser : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case LOGIN_REQ : 
            return {
                ...state,
                loginUser: payload
            };
        default :
            return state;
    }
}