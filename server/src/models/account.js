const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define el esquema del modelo
const AccountSchema = new Schema({
    account_name: String,
    gmail: String,
    password: String,
    creation_date: Date,
    state: String //Para indicar que una cuenta esta activa o eliminada y fuera de funcionamiento digamos.
});

// Crea y exporta el modelo
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
