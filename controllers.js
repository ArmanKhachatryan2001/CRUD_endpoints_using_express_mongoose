const mongoose = require('mongoose');
const Model = require('./model');
const crypto = require('crypto');

async function createdata(req, res) {
    const hash = crypto.createHash('sha256');
    const password = req.body.password.toString();
    const hashedpassword = hash.update(password).digest('hex');
    
    const data = new Model({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        password: hashedpassword
    });

    const val = await data.save();
    res.send('posted');
}

async function updatedata(req, res) {
    const upid = req.params.id;  
    let upname = req.body.name;
    let upsurname = req.body.surname;
    let upage = req.body.age;

    const hash = crypto.createHash('sha256');
    const password = req.body.password.toString();
    const hashedpassword = hash.update(password).digest('hex');
    let uppassword = hashedpassword;

    const data = await Model.findOneAndUpdate(
        {_id: upid},
        {$set: {name: upname, surname: upsurname, age: upage, password: uppassword}},
        {new: true}
    );

    if (data == null) {
        res.send('no update occurred');
    } else {
        res.send('update has taken place');
    }
}

async function deletedata(req, res) {
    const delid = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(delid)) {
        res.send('invalid id');
    } else {
        const deleted = await Model.findByIdAndDelete(delid);
        if (deleted === null) {
            res.send('an error occurred');
        } else {
            res.send('successfully deleted');
        }
    }
}

async function fetchdata(req, res) {
    const excludeduserid = req.params.id;
    const data = await Model.find({_id: excludeduserid}, '-_id -__v -password');

    if (data.length === 0) {
        res.send('no such data');
    } else {
        res.send(data);
    }
}

module.exports = {
    createdata,
    updatedata,
    deletedata,
    fetchdata
};