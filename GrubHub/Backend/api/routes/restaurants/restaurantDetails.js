const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');
const Sections = require('../../models/sectionModel');
const Items = require('../../models/itemModel');
const Orders = require('../../models/orderModel');

router.get("/DetailsPage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /DetailsPage 1");

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_restaurant_sections',body, function(err,results){
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

router.post("/RestaurantItemsPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /DetailsPage 2");

    kafka.make_request('get_restaurant_items',req.body, function(err,results){
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

router.post("/CheckoutOrders", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Checkout Orders");

    kafka.make_request('create_orders',req.body, function(err,results){
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