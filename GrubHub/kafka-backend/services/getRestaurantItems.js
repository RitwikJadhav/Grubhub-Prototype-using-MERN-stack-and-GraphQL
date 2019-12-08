const mongoose = require('mongoose');
const Items = require('../models/itemModel');

function handle_request(msg, callback){
    console.log('Inside item restaurant display in kafka backend');
    Items.find({
        RestaurantName : msg.restaurantName,
        SectionName : msg.localsection
    })
    .then(response => {
        console.log("Response : "+response);
        callback(null,response);
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;