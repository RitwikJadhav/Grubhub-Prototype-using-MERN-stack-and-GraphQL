const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var kafka = require('../../kafka/client');

const UserInfo = require('../../models/userinfoModel');

router.post("/Buyer", function(req,res) {
    console.log('Inside /Buyer');
    console.log('Making request to Kafka >> ');

    kafka.make_request('create_user',req.body, function(err,results){
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
                res.status(200).json({
                    success : true,
                    message : 'User Registered successfully'
                });
                //res.end();
            }
    });
});

router.post("/Owner", function(req,res) {
    console.log('Inside /Owner');
    console.log('Making request to Kafka >> ');

    kafka.make_request('create_user_owner',req.body, function(err,results){
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
                res.status(200).json({
                    success : true,
                    message : 'User - Owner Registered successfully'
                });
                //res.end();
            }
    });
});


module.exports = router;
