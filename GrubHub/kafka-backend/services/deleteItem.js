const mongoose = require('mongoose');
const Items = require('../models/itemModel');

function handle_request(msg, callback){

    console.log('Inside item deletion in kafka backend');

    Items.findOne({
        itemName : msg.itemToRemove
    })
    .remove()
    .exec()
    .then(response => {
        if(!response) {
            callback(null,"Response not received");
        }
        else {
            callback(null,"Item Deleted");
        }
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;