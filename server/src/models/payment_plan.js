'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentPlanSchema = new Schema({
    payment_name: String,
    price: Number,
    currency: String,
    description: String,
    duration: String,
    contribution_pass: { //hace referencia que si hace tanta contribucion pueda tener cierta cantidad de dias de uso gratis.
        recetas_edits: Number,
        products_edits: Number,
        products_adds: Number
    }
});

module.exports = mongoose.model('PaymentPlan', paymentPlanSchema);


