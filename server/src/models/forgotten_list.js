'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgottenListSchema = new Schema({
    product_id: String,
    quantity: Number,
    unit_of_measurement: String,
    state: String,
    purchase_price: Number,
    currency: String,
    extra_information: String,
    last_purchase_date: String,
    duration_time: String,
    location: {
        latitude: Number,
        longitude: Number,
        address: {
            street_address: String,
            city: String,
            state: String,
            postal_code: String,
            country: String
        },
        location_name: String,
        location_notes: String,
        location_type: String
    }
});

module.exports = mongoose.model('ForgottenList', forgottenListSchema);


