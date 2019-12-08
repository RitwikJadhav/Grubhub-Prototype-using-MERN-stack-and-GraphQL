import { SEARCH_ITEM } from './types';
import axios from 'axios';
import constants from '../config';

export const searchItem = (userData) => dispatch => {
    console.log('Search item action called');
    axios.post(constants.apiUrl+'SearchResults',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : SEARCH_ITEM,
        payload : test
    })); 
};