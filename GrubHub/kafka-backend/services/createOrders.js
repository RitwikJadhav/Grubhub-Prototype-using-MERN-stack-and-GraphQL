const mongoose = require('mongoose');
const Orders = require('../models/orderModel');

function handle_request(msg, callback){

    console.log('Inside order creation in kafka backend');

    const addOrders = new Orders({
        _id : new mongoose.Types.ObjectId(),
        ItemNames : msg.itemNameForOrder,
        RestaurantName : msg.restaurantName,
        OrderPersonName : msg.personName,
        Status : msg.status,
        Total : msg.totalCost,
    })
    addOrders.save(function(err,result) {
        if(err) {
            console.log(err);
            callback(null,err);
        }
        else {
            console.log(result);
            callback(null,result);
        }
    });
}

exports.handle_request = handle_request;