const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');
const redisClient = require('../../../../kafka-backend/redisConfig');

const Items = require('../../models/itemModel');
router.post("/", function(req,res) {
    console.log("Inside /Search");

    /*const itemsKey = "items";

    return redisClient.get(itemsKey, (err, items) => {
        if(items) {
            console.log('GETTING DATA FROM REDIS');
            res.send(items);
        }
        else {
            console.log('GETTTING DATA FROM DATABASE');
            Items.find({
                itemName : req.body.itemToSearch
            })
            .then(response => {
                console.log("Response from the database for Menu : "+response)
                redisClient.setex(itemsKey,36000, JSON.stringify(response))
                res.send(JSON.stringify(response));

            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    success : false,
                    message : "Something went wrong"
                });
            });
        }
    })*/

    kafka.make_request('get_searched_items',req.body, function(err,results){
        console.log('Kafka response received <<');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success : false,
                message : "Something went wrong"
            });
        }
        else {
            console.log("Results received successfully --->");
            console.log(JSON.stringify(results));
            res.send(JSON.stringify(results));
        }
    });
});

module.exports = router;