const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside item updation in kafka backend');

    Items.findOneAndUpdate(
        {itemName : msg.itemsName, RestaurantName : msg.restaurantName},
        {$set : {itemName : msg.itemName, description : msg.itemDesc, itemprice : msg.itemPrice}},
        {new : true}
    )
    .then(response => {
        console.log(response);
        if(!response) {
            callback(null,"Response not received");
        }
        else {
            console.log("Response : "+response);
            callback(null,response);
        }
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;