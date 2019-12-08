const mongoose = require('mongoose');
const Items = require('../models/itemModel');
const redisClient = require('../redisConfig');

function handle_request(msg, callback){

    console.log('Inside display search results in kafka backend');
    const itemsKey = "items";

    redisClient.get(itemsKey, (err, items) => {
        if(items) {
            return callback(null,items);
        }
        else {
            Items.find({
                itemName : msg.itemToSearch
            })
            .then(response => {
                console.log("Response from the database for Menu : "+response)
                redisClient.setex(itemsKey,36000, JSON.stringify(response))
                callback(null,response);

            })
            .catch(err => {
                console.log(err);
                callback(null,err);
            });
        }
    })
   
};  

exports.handle_request = handle_request;