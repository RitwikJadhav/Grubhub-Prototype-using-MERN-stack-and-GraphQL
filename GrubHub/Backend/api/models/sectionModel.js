const mongoose = require('mongoose');

const sectionModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sectionName : String,
    sectionDescription : String,
    RestaurantName : String
});

module.exports = mongoose.model('Sections',sectionModel);