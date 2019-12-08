const mongoose = require('mongoose');
const Items = require('../models/itemModel');

function handle_request(msg, callback){

    console.log('Inside section display update in kafka backend');

    Items.findOne({
        itemName : msg.parameter
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        callback(null,response);
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;