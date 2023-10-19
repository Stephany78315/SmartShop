const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productWithoutQRSchema = new Schema({
    name: String,
    image: String,
    category: [String],
    creation_date: Date,
    production_location: {
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
        location_type: String,
        distributors: [{
            price: Number,
            currency: String,
            quantity: Number,
            unit_of_measurement: String,
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
        }]
    },
    consumption_history: [{
        quantity_consumed: Number,
        unit_of_measurement: String,
        duration_of_product: String
    }]
});

module.exports = mongoose.model('ProductWithoutQR', productWithoutQRSchema);