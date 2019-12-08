const mongoose = require('mongoose');
const Messages = require('../models/messageModel');

function handle_request(msg, callback){

    console.log('Inside send message in kafka backend');

    console.log('Sender : '+msg.sender);
    console.log('Sender : '+msg.receiver);
    Messages.findOne({
        sender : msg.sender,
        receiver : msg.receiver
    }, function(err,result) {
        console.log('Err : '+err );
        console.log('Result : ' +result);
        if(!result) {
            const messages = new Messages({
                _id : new mongoose.Types.ObjectId(),
                sender : msg.sender,
                receiver : msg.receiver,
                message : msg.message,
                date : msg.date
            })
        
            messages.save()
            .then(response => {
                console.log(response);
                if(!response) {
                    callback(null,"Response not reeceived");
                }
                else {
                    console.log(response);
                    callback(null,response);
                }
            })
            .catch(err => {
                console.log(err);
                callback(null,err);
            });
        }
        else if(result) {
            Messages.update({
                $push : { message : msg.message}
            })
            .then(response => {
                console.log(response);
                if(!response) {
                    callback(null,"Response not reeceived");
                }
                else {
                    console.log(response);
                    callback(null,response);
                }
            })
            .catch(err => {
                console.log(err);
                callback(null,err);
            });
        }
    });
}

exports.handle_request = handle_request;