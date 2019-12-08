const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const Sections = require('../models/sectionModel');

function handle_request(msg, callback){

    console.log('Inside item deletion in kafka backend');

    const sectionRemove = msg.sectionToRemove;
    console.log("Section to remove : " +sectionRemove);
    Sections.deleteOne({
        sectionName : msg.sectionToRemove
    }, function(err, section) {
        if(err) {
            console.log(err);
            callback(null,err);
        }
        console.log('Inside the nested item remove request');
        console.log('Item section Name : '+sectionRemove);
        Items.deleteOne({
            SectionName : sectionRemove
        })
        .then(response => {
            console.log(response);
            callback(null,"Section Deleted");
        })
        .catch(err => {
            console.log(err);
            callback(null,err);
        });
    });
};  

exports.handle_request = handle_request;