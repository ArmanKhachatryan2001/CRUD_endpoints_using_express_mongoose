const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

const {
    createdata,
    updatedata,
    deletedata,
    fetchdata
} = controllers;

router.post('/post', createdata);
router.put('/update/:id', updatedata);
router.delete('/del/:id', deletedata);
router.get('/fetch/:id', fetchdata);

module.exports = router;
