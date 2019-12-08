import { RESTAURANT_DISPLAY } from './types';
import axios from 'axios';
import constants from '../config';

export const restaurantSearchItem = () => dispatch => {
    console.log('Restaurant Search item action called');
    let restaurantToSearch = localStorage.getItem('RestaurantNameForCustomer');
    axios.get(`${constants.apiUrl}Restaurant/DetailsPage/${restaurantToSearch}`,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : RESTAURANT_DISPLAY,
        payload : test
    })); 
};