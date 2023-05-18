const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    password: String
});

const Model = mongoose.model('Data', schema);

module.exports = Model;