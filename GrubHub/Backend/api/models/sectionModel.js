const mongoose = require('mongoose');

const sectionModel = new mongoose.Schema({
    sectionName : String,
    sectionDescription : String,
    RestaurantName : String
});

module.exports = mongoose.model('Sections',sectionModel);