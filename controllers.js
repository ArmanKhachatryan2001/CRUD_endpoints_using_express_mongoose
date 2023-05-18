const mongoose = require('mongoose');
const Model = require('./model');
const crypto = require('crypto');

async function createdata(req, res)
{
    const {
            name, surname, age,
            email, gender, address,
            phone_number, registration_date
          } = req.body;
          
    const hash = crypto.createHash('sha256');
    const hashpassword = req.body.password.toString();
    const hashedpassword = hash.update(hashpassword).digest('hex');
    
    const data = new Model({
        name, surname, age,
        email, gender, address,
        phone_number, registration_date,
        password: hashedpassword
    });

    const val = await data.save();
    res.send('posted');
}

function updatefields(reqbody)
{
    const {
            name, surname, age,
            email, gender, address,
            phone_number, registration_date, password
          } = reqbody;

    const fieldsupdate = {};

    if (name) { fieldsupdate.name = name; }
    if (surname) { fieldsupdate.surname = surname; }
    if (age) { fieldsupdate.age = age; }
    if (email) { fieldsupdate.email = email; }
    if (gender) { fieldsupdate.gender = gender; }
    if (address) { fieldsupdate.address = address; }
    if (phone_number) { fieldsupdate.phone_number = phone_number; }
    if (registration_date) { fieldsupdate.registration_date = registration_date; }
    if (password) {
        const hash = crypto.createHash('sha256');
        const password = reqbody.password.toString();
        const uppassword = hash.update(password).digest('hex');
        fieldsupdate.password = uppassword;
    }
    return fieldsupdate;
}

async function updatedata(req, res)
{
    const upid = req.params.id;  
    const updatedata = updatefields(req.body);

    const data = await Model.findOneAndUpdate(
        {_id: upid},
        {$set: updatedata},
        {new: true}
    );

    if (data == null) {
        res.send('no update occurred');
    } else {
        res.send('update has taken place');
    }
}

async function deletedata(req, res)
{
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

async function fetchdata(req, res) 
{
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
