const express = require('express');
const bcrypt = require('bcryptjs');
var mysql = require('mysql');
var pool = require('../../../pool');
const mongoose = require('mongoose');
const router = express.Router(); 
const passport = require('passport');
var kafka = require('../../kafka/client');

const Sections = require('../../models/sectionModel');
const Items = require('../../models/itemModel');

router.get('/HomePage/:id', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside /MenuHomePage');
    console.log(req.params.id);

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_menu',body, function(err,results){
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

router.post("/SectionAddPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /SectionAddPage");

    kafka.make_request('create_section',req.body, function(err,results){
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


router.post("/ItemRemovePage", function(req,res) {
    console.log("Inside /ItemRemove");

    kafka.make_request('delete_item',req.body, function(err,results){
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


router.post("/ItemAddPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /ItemAddPage");

    kafka.make_request('create_item',req.body, function(err,results){
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

router.post("/SectionRemove", function(req,res) {
    console.log("Inside /SectionRemove");

    kafka.make_request('delete_section',req.body, function(err,results){
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

router.get("/ItemUpdatePage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Get Sections");
    console.log(req.params.id);

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_sections',body, function(err,results){
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

router.post("/ItemUpdatePage", function(req,res) {
    console.log("Inside Get /SectionUpdate");

    kafka.make_request('update_section',req.body, function(err,results){
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

router.get("/SectionUpdatePage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {

    console.log("Inside Get /Items");

    const body = {
        parameter : req.params.id
    }

    kafka.make_request('get_items',body, function(err,results){
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

router.post("/SectionUpdatePage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /ItemUpdate");

    kafka.make_request('update_item',req.body, function(err,results){
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