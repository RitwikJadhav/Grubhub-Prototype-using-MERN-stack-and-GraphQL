const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside item updation in kafka backend');

    Sections.update(
        {sectionName : msg.sectionsName, RestaurantName : msg.restaurantName},
        {$set : {sectionName : msg.sectionName,sectionDescription : msg.sectionDesc}},
        {new : true},
        function(err, section) {
            if(err) {
                console.log(err);
                callback(null,err);
            }
            console.log("New section name for item : "+msg.sectionName);
            console.log("Old section name for item : "+msg.sectionsName);
            Items.update(
                {SectionName : msg.sectionsName},
                {$set : {SectionName : msg.sectionName}}
            )
            .then(response => {
                console.log(response);
                callback(null,response);
            })
            .catch(err => {
                console.log(err);
                callback(null,err);
            });
        }
    );
};  

exports.handle_request = handle_request;