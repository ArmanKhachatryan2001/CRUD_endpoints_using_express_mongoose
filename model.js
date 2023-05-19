const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    email: String,
    gender: String,
    address: String,
    phone_number: String,
    registration_date: String,
    password: String
});

const Model = mongoose.model('Data', schema);

module.exports = Model;
