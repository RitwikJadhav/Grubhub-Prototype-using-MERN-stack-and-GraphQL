const mongoose = require('mongoose');
const UserInfo = require('../models/userinfoModel');

function handle_request(msg, callback){

    console.log('Inside profile buyer view in kafka backend');

    UserInfo.findOne({
        Email : msg.parameter
    })
    .then(response => {
        console.log("Response from the database : "+response);
        callback(null,response);
        //console.log(JSON.stringify(response))
        //res.send(JSON.stringify(response));
        console.log('Callback triggered in handle request');
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
        console.log('Callback triggered in handle request');
    });
};  

exports.handle_request = handle_request;