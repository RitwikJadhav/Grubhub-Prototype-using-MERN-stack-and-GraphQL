const mongoose = require('mongoose');
const UserInfo = require('../models/userinfoModel');

function handle_request(msg, callback){

    console.log('Inside profile update in kafka backend');

    UserInfo.findOneAndUpdate(
        {Email : msg.Email},
        {$set : {FirstName : msg.FirstName, LastName : msg.LastName, Email : msg.Email, PhoneNumber : msg.PhoneNumber}},
        {new : true}
    )
    .then(response => {
        console.log(response);
        if(!response) {
            callback(null,"Response not received");
        }
        else {
            console.log("Response from the database : "+response);
            callback(null,response);
            //res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;