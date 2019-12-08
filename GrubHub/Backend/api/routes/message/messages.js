const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');
const Messages = require('../../models/messageModel');

router.post('/SendMessage', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /Send message buyer');

    kafka.make_request('send_message',req.body, function(err,results){
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

router.post('/ReceivedMessages', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /Receive Messages');

    kafka.make_request('get_message',req.body, function(err,results){
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

router.post('/SendReply', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /Send Reply');
    kafka.make_request('send_reply',req.body, function(err,results){
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

router.post('/ReceivedReply', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside message reply request');

    kafka.make_request('get_reply',req.body, function(err,results){
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
    /*Messages.find({
        receiver : req.body.restaurantName
    })
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Messages not received'
            });
        }
        else {
            console.log(response);
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Error in adding sections'
        });
    });*/
});
module.exports = router;