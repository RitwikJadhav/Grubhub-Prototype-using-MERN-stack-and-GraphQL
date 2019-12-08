const mongoose = require('mongoose');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside section display update in kafka backend');
    Sections.findOne({
        sectionName :msg.parameter
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