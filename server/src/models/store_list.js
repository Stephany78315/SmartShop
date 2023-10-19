'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeListSchema = new Schema({
    account_id: String,
    products: [
        {
            product_id: String,
            quantity: Number,
            unit_of_measurement: String,
            state: String,
            purchase_price: Number,
            currency: String,
            purchase_date: Date,
            expiration_date: Date,
            duration_time: String,
            from_this_recipe: String,
            extra_information: String,
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
        }
    ]
});

module.exports = mongoose.model('StoreList', storeListSchema);


