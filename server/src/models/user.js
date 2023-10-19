'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account_id: String,
    user_name: String,
    image: String,
    gender: String,
    date_of_birth: Date,
    country: String,
    city: String,
    allergies: String,
    contribution: [
        {
            activity_type: String,
            id_object: String,
            activity_date: Date
        }
    ],
    notification: {
        products_out_of_stock: Boolean,
        products_low_price: Boolean,
        expired_products: Boolean
    },
    food_preferences: [
        {
            name: String,
            category: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
