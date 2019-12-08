const express = require('express');
const bcrypt = require('bcryptjs');
var mysql = require('mysql');
var pool = require('../../../pool');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const User = require('../../models/userinfoModel');

router.post('/',function(req,res) {
     User.findOne({
         Email : req.body.username
     }, function(err, user) {
         if(err) throw err;
         if(!user) {
             res.send({ success : false, message : 'User not found'});
         }
         else {
            var token = jwt.sign(user.toJSON(), 'gaandfaad', {
                expiresIn : 10080
             });
            res.json({ success : true, token: 'JWT '+ token});
             /*user.comparePassword(req.body.password, function(err, isMatch) {
                 if(isMatch && !err) {
                    
                 }
                 else {
                     res.send({ success : false, message : 'Passwords did not match'});
                 }
             });*/
         }
     });
});

module.exports = router;
