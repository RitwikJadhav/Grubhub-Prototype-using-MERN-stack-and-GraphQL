const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside section creation in kafka backend');

    const addSections = new Sections({
        _id : new mongoose.Types.ObjectId(),
        sectionName : msg.sectionName,
        sectionDescription : msg.sectionDesc,
        RestaurantName : msg.restaurantName
    });
    addSections.save()
    .then(result => {
        if(!result) {
            callback(null,"Response not received");
        }
        else {
            console.log("Response from the database : "+ result);
            callback(null,result);
        }
    })
    .catch((err) => {
        console.log(err);
        callback(null,err);
    })
};  

exports.handle_request = handle_request;