import { ITEM_ADD } from './types';
import { ITEM_REMOVE } from './types';
import { ITEM_DISPLAY } from './types';
import { ITEM_GET } from './types';
import { ITEM_UPDATE } from './types';
import axios from 'axios';
import constants from '../config';

export const itemAddition = (userData) => dispatch => {
    console.log('Item addition Request action called');
    axios.post(constants.apiUrl+'Menu/ItemAddPage',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.status)
    .then(test => dispatch({
        type : ITEM_ADD,
        payload : test
    })); 
};

export const itemRemoval = (userData) => dispatch => {
    console.log('Item deletion action called');
    axios.post(constants.apiUrl+'Menu/ItemRemovePage',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.status)
    .then(test => dispatch({
        type : ITEM_REMOVE,
        payload : test
    })); 
};

export const itemMenuDisplay = () => dispatch => {
    console.log('Item menu display action called');
    var localRestaurantName = localStorage.getItem('RestaurantName');
    console.log(localRestaurantName);
    console.log(localStorage.getItem('Token'));
    axios.get(`${constants.apiUrl}Menu/HomePage/${localRestaurantName}`,{
        headers : {
            Authorization : "JWT " + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : ITEM_DISPLAY,
        payload : test
    })); 
};

export const itemMenuGet = () => dispatch => {
    console.log('Item get update action called');
    var getLocalString = localStorage.getItem('ItemToUpdate');
    axios.get(`${constants.apiUrl}Menu/SectionUpdatePage/${getLocalString}`,{
        headers : {
            Authorization : "JWT " + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : ITEM_GET,
        payload : test
    })); 
};

export const itemUpdation = (userData) => dispatch => {
    console.log('Item updation Request action called');
    axios.post(constants.apiUrl+'Menu/SectionUpdatePage',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.status)
    .then(test => dispatch({
        type : ITEM_UPDATE,
        payload : test
    })); 
};



