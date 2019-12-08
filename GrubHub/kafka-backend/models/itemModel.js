const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

const itemsModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName : String,
    itemprice : String,
    SectionName : String,
    description : String,
    sectionId : {
        type : ObjectId,
        ref : 'Sections'
    },
    RestaurantName : String
});

module.exports = mongoose.model('Items',itemsModel);