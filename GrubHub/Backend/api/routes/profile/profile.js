const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var pool = require('../../../pool');
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');

const UserInfo = require('../../models/userinfoModel');

router.get('/:id',passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /profile');
    console.log(req.params.id);

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_profile_buyer',body, function(err,results){
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
                /*res.status(200).json({
                    success : true,
                    message : 'User Registered successfully'
                });*/
                //res.end();
        }
    });
});

router.get('/Edit/:id', passport.authenticate('jwt',{ session : false }), function(req,res) {

    console.log('Inside /Profile Edit');

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_profile_buyer',body, function(err,results){
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
                /*res.status(200).json({
                    success : true,
                    message : 'User Registered successfully'
                });*/
                //res.end();
        }
    });
})

router.post('/EditUpdate',function(req,res) {
    console.log("Inside /Profile Buyer Update");
    console.log(req.body.Email);

    kafka.make_request('update_profile_buyer',req.body, function(err,results){
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
                /*res.status(200).json({
                    success : true,
                    message : 'User Registered successfully'
                });*/
                //res.end();
        }
    });
})

module.exports = router;