import { GET_PROFILE } from './types';
import axios from 'axios';
import constants from '../config';

export const getProfileDetails = () => dispatch => {
    console.log('Get Profile Request action called');
    var getLocalString = localStorage.getItem('Email')
    let config = {
        headers : {
            Authorization : "JWT " + localStorage.getItem('Token')
        }
    }
    axios.get(`${constants.apiUrl}Profile/${getLocalString}`,config)
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_PROFILE,
        payload : test
    })); 
};

