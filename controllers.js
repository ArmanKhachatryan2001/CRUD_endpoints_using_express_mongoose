const mongoose = require('mongoose');
const Model = require('./model');
const utils = require('./utils');

async function createdata(req, res) {

    const correctdata = utils.createcorrectdata(req.body, res);
      
    if (correctdata) {
        const data = new Model(correctdata);
        await data.save();
        res.send('posted');
    }
}

async function updatealldata(req, res)
{
    const upid = req.params.id;
    const changealldata = utils.createcorrectdata(req.body, res);
    if (changealldata) {
        const data = await Model.findOneAndUpdate(
            { _id: upid },   
            {$set: changealldata},
            {new: true}
        );

        if (data === null) {
            res.send('No update occurred');
        } else {
            res.send(data);
        }
    }
}

async function updatedata(req, res)
{
    const updatedata = utils.updatefields(req.body, res);
    if (updatedata) {
        const upid = req.params.id; 
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
    updatealldata,
    updatedata,
    deletedata,
    fetchdata
};
