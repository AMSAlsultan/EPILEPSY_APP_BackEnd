const {Patient} = require('../models/patient');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    const patientList = await Patient.find();

    if (!patientList) {
        res.status(500).json({success: false})
    }
    res.send(patientList);
})

module.exports =router;