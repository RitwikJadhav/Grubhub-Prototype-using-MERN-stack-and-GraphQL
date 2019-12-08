import { SIGNUP_BUYER } from './types';
import { SIGNUP_OWNER } from './types';
import axios from 'axios';
import constants from '../config';

export const signUpBuyer = (userData) => dispatch => {
    console.log('Signup Request action called');
    axios.post(constants.apiUrl+'Signup/Buyer',userData)
        .then(response => response.status)
        .then(test => dispatch({
            type : SIGNUP_BUYER,
            payload : test
    })); 
};

export const signUpOwner = (userData) => dispatch => {
    console.log('Signup Request action called');
    axios.post(constants.apiUrl+'Signup/Owner',userData)
        .then(response => response.status)
        .then(test => dispatch({
            type : SIGNUP_OWNER,
            payload : test
    })); 
};
