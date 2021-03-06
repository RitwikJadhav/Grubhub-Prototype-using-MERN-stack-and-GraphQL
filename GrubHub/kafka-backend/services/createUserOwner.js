const mongoose = require('mongoose');
const UserInfo = require('../models/userinfoModel');

function handle_request(msg, callback){

    console.log('Inside user owner registration in kafka backend');

    var userInfoOwnerSignup = new UserInfo({
        _id : new mongoose.Types.ObjectId(),
        FirstName : msg.firstName,
        LastName : msg.lastName,
        Email : msg.email,
        Password : msg.password,
        role : msg.owner,
        RestaurantName : msg.restaurantName,
        RestaurantZipCode : msg.restaurantZipCode
    });

    userInfoOwnerSignup.save(function(err) {
        if(err) {
            console.log(err);
            callback(null,err);
        };

        UserInfo.findOne({
            Email : msg.email
        }, function(err, user) {
            if(err) {
                console.log(err);
                callback(null,err);
            }

            user.comparePassword(userInfoOwnerSignup.Password, function(err,isMatch) {
                if(err) {
                    console.log(error);    
                } 
                else {
                    console.log(userInfoOwnerSignup.Password, isMatch);
                    callback(null,"Signup Succesful");
                }
                
            })
        })
        console.log('Callback triggered in handle request');
    });
};  

exports.handle_request = handle_request;