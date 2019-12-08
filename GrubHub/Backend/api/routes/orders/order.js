const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');
const Orders = require('../../models/orderModel');

router.post("/RecentOrderReq", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Recent Order Request");

    kafka.make_request('get_order_restaurant',req.body, function(err,results){
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

router.post("/OrderStatusUpdate",  passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Update order status");

    kafka.make_request('update_order_status',req.body, function(err,results){
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

router.post("/GetRecentOrderRequest", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Get Active Orders");
    //const personName = req.body.firstName + " " + req.body.lastName;

    kafka.make_request('get_active_orders',req.body, function(err,results){
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


router.post("/GetDeliveredItems", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get delivered customer request");

    kafka.make_request('get_delivered_orders',req.body, function(err,results){
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

router.post('/drag',passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /drag');

    Orders.findOneAndUpdate({
        OrderPersonName : req.body.fullName,
        RestaurantName : req.body.restaurantName,
        Total : req.body.orderTotalCost
    }, {$set : {
        PositionX : req.body.positionX,
        PositionY : req.body.positionY
    }},{
        new : true
    })
    .then(response => {
        console.log(response);
        res.json({
            success : true,
            message : 'Successfully updated the co-ordinates'
        });
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : true,
            message : 'Something went wrong'
        });
    })
});

router.post('/getDrag',passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /drag');

    Orders.findOne({
        OrderPersonName : req.body.fullName,
        RestaurantName : req.body.restaurantName,
        Total : req.body.orderTotalCost
    })
    .then(response => {
        console.log(response);
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : true,
            message : 'Something went wrong'
        });
    })
});

module.exports = router;
