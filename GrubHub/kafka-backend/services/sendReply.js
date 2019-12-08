const mongoose = require('mongoose');
const Messages = require('../models/messageModel');

function handle_request(msg, callback){

    console.log('Inside send message in kafka backend');

    Messages.findOneAndUpdate(
        { receiver : msg.sender,
        sender : msg.receiver},
        {$push : {message : msg.message}})
    .then(response => {
        console.log(response);
        if(!response) {
            callback(null,"Response not received");
        }
        else {
            console.log(response);
            callback(null,response);
        }
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
}

exports.handle_request = handle_request;