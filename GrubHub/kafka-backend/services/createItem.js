const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside item creation in kafka backend');

    Sections.findOne({
        sectionName : msg.itemSection
    }, function(err, section) {
        if(err) {
            console.log(err);
            callback(null,err);
        }
        const addItems = new Items({
            _id : new mongoose.Types.ObjectId(),
            itemName : msg.itemName,
            description : msg.itemDesc,
            itemprice : msg.itemPrice,
            SectionName : msg.itemSection,
            sectionId : section._id,
            RestaurantName : msg.restaurantName
        });
        addItems.save()
        .then(result => {
            if(!result) {
                callback(null,"Response not received");
            }
            else {
                console.log("Response from the database : "+ result);
                callback(null,result);
            }
            console.log('Callback triggered in handle request');
        })
        .catch((err) => {
            console.log(err);
            callback(null,err);
            console.log('Callback triggered in handle request');
        });
    })
};  

exports.handle_request = handle_request;