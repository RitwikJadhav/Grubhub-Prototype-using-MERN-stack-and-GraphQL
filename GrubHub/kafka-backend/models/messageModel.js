const mongoose = require('mongoose');

const messages = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message : [{
        type : String
    }],
    sender : String,
    receiver : String,
    datetime : Date,
    reply : [{
        type : String
    }],
    orderid : String
});

module.exports = mongoose.model('Messages',messages);