const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    RestaurantName : String,
    ItemNames : [{
        type : String 
    }],
    OrderPersonName : String,
    Address : String,
    Status : String,
    Total : String
});

module.exports = mongoose.model('Orders',orders);