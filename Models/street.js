const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StreetSchema = new Schema({
    street_id: {
        type: String
    },
    street_name: {
        type: String
    },
    ward_id: {
        type: String
    },
    status: {
        type: String
    },
    ward_name:{
        type:String
    },
    zone_id:{
        type:String
    },
    zone_name:{
        type:String
    },
    created_by_user: {
        type: String
    },
}, { timestamps: true });

const StreetModel = db.model('Street', StreetSchema);
module.exports = StreetModel;
