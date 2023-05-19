const crypto = require('crypto');
const http = require('http');

function createcorrectdata(reqbody, res)
{
    const {
            name, surname, age,
            email, gender, address,
            phone_number, registration_date,
            password
          } = reqbody;

    if (!(name && /^[A-Za-z]+$/.test(name))) {
        res.status(400).json({ error:'Invalid name format. Name should contain only uppercase and lowercase letters'});
        return null;
    } else if (!(surname && /^[A-Za-z]+$/.test(surname))) {
        res.status(400).json({ error:'Invalid surname format. Surname should contain only uppercase and lowercase letters'});
        return null;
    } else if (!(age && /^[0-9]+$/.test(age))) {
        res.status(400).json({ error:'invalid age format, Age should contain only numbers'});
        return null;
    } else if (!(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        res.status(400).json({ error:'The string is not a valid email address'});
        return null;
    } else if (!(gender && /^(male|female|other)$/i.test(gender))) {
        res.status(400).json({ error: 'Invalid gender format. Gender should be male, female or other'});
        return null;
    } else if (!address) {
        res.status(400).json({ error:'Invalid address format. Address should not be empty'});
        return null;
    } else if (!(phone_number && /^[\d-\s]+$/.test(phone_number))) {
        res.status(400).json({ error:'The phone number is not valid'});
        return null;
    } else if (!(registration_date && /^\d{2}\s*-\s*\d{2}\s*-\s*\d{4}$/.test(registration_date))) {
        res.status(400).json({ error:'The registration date is not valid.'});
        return null;
    } else if (!password) {
        res.status(400).json({ error:'invalid password'});  
        return null;  
    }

    const hash = crypto.createHash('sha256');
    const hashpassword = reqbody.password.toString();
    const hashedpassword = hash.update(hashpassword).digest('hex');

    const correctdata = {
        name, surname, age,
        email, gender, address,
        phone_number, registration_date,
        password: hashedpassword
    };

    return correctdata;
}

function updatefields(reqbody, res)
{
    const {
            name, surname, age,
            email, gender, address,
            phone_number, registration_date, password
          } = reqbody;

    const fieldsupdate = {};
          
    if (name) { 
        if (!/^[A-Za-z]+$/.test(name)) {
            res.status(400).json({ error:'Invalid name format. Name should contain only uppercase and lowercase letters'});
            return null;
        }
        fieldsupdate.name = name; 
    }
    if (surname) {
        if (!/^[A-Za-z]+$/.test(surname)) {
            res.status(400).json({ error:'Invalid surname format. Surname should contain only uppercase and lowercase letters'});
            return null;
        }
        fieldsupdate.surname = surname;
    }
    if (age) { 
        if (!/^[0-9]+$/.test(age)) {
            res.status(400).json({ error:'invalid age format, Age should contain only numbers'});
            return null;
        }
        fieldsupdate.age = age; 
    }
    if (email) { 
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.status(400).json({ error:'The string is not a valid email address'});
            return null;
        }
        fieldsupdate.email = email; 
    }
    if (gender) { 
        if (!/^(male|female|other)$/i.test(gender)) {
            res.status(400).json({ error:'Invalid gender format. Gender should be male, female or other'});
            return null;
        }
        fieldsupdate.gender = gender; 
    }
    if (address) { 
        fieldsupdate.address = address; 
    }
    if (phone_number) { 
        if (!/^[\d-\s]+$/.test(phone_number)) {
            res.status(400).json({ error:'The phone number is not valid'});
            return null;
        } 
        fieldsupdate.phone_number = phone_number; 
    }
    if (registration_date) { 
        if (!/^\d{2}\s*-\s*\d{2}\s*-\s*\d{4}$/.test(registration_date)) {
            res.status(400).json({ error:'The registration date is not valid.'});
            return null;
        }
        fieldsupdate.registration_date = registration_date; 
    }
    if (password) {
        const hash = crypto.createHash('sha256');
        const password = reqbody.password.toString();
        const uppassword = hash.update(password).digest('hex');
        fieldsupdate.password = uppassword;
    }
    return fieldsupdate;
}

module.exports = {
    createcorrectdata,
    updatefields
}