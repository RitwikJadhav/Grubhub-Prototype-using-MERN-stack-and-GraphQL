const mongoose = require('mongoose');
const Orders = require('../models/orderModel');

function handle_request(msg, callback){
    console.log('Inside recent orders for restaurant in kafka backend');
    Orders.find({
        RestaurantName : msg.restaurantName
    })
    .then(response => {
        if(!response) {
            callback(null,"Response not received");
        }
        else {
            console.log("Response from the database : "+ response);
            callback(null,response);
        }
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;