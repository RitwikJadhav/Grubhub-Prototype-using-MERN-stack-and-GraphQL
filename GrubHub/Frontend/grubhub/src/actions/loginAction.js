import { LOGIN_REQ } from './types';
import axios from 'axios';
import constants from '../config';
var jwtDecode = require('jwt-decode');


export const loginRequest = (data) => dispatch => {
    console.log('Inside login request using redux');
    axios.defaults.withCredentials = true;
        axios.post(constants.apiUrl+'Login',data)
        .then(response => {
            console.log(response);
            console.log(response.data.token);
            const fullJwtToken = response.data.token;
            const tokenURL = fullJwtToken.split(' ')[1];
            console.log(tokenURL);
            var decodedResponse = jwtDecode(tokenURL);
            console.log("Token : "+tokenURL);
            localStorage.setItem('Token',tokenURL);
            console.log(decodedResponse.role);
            if(response.status === 200) {
                if(decodedResponse.role == 'Buyer' || decodedResponse.role == 'Owner') {
                //if(response.data[0].role == 'Buyer' || response.data[0].role == 'Owner') {
                    console.log(response.data);
                    console.log('yeee');
                    this.setState({
                        email : decodedResponse.Email,
                        firstName : decodedResponse.FirstName,
                        lastName : decodedResponse.LastName,
                        phone : decodedResponse.PhoneNumber,
                        restaurantName : decodedResponse.RestaurantName,
                        restaurantZipCode : decodedResponse.RestaurantZipCode,
                        cuisine : decodedResponse.Cuisine,
                        role : decodedResponse.role
                    })            
                }
                
            }
            else {
                this.setState({
                    setShow : true
                })
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                setShow : true
            })
        })
        .then(test => dispatch({
            type : LOGIN_REQ,
            payload : test
        }));
}