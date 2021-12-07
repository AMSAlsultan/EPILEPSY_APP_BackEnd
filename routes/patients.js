const {Patient} = require('../models/patient');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get all Patients
router.get('/', async (req, res) =>{
    const patientList = await Patient.find().select('fullname');

    if (!patientList) {
        res.status(500).json({success: false})
    }
    res.send(patientList);
})

//get Patients by id
router.get(`/:id`, async(req,res)=>{
    const patient = await Patient.findById(req.params.id).select('-passwordHash');

    if(!patient) {
        res.status(500).json({message: 'The patient with the given ID was not fount.'})
    }
    res.status(200).send(patient);
})

//register Patients
router.post(`/`, async (req,res)=>{
    let patient = new Patient({
        fullname: req.body.fullname,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 6),
        gender: req.body.gender,
        birthday: req.body.birthday,
    })
    patient = await patient.save();

    if (!patient)
    return res.status(400).send('the patient cannot be created!')

    res.send(patient);
})

//Patients personal data
router.put(`/:id`, async (req,res)=>{
    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        {
            epilepsyType: req.body.epilepsyType,
            epilepsyTimes: req.body.epilepsyTimes,
            epilepsyFrequencies: req.body.epilepsyFrequencies,
            forHowLong: req.body.forHowLong,
            epilepsyTriggers: req.body.epilepsyTriggers,
            issues: req.body.issues,
            address: req.body.address
        }
    )
    if (!patient)
    return res.status(400).send('the patient cannot be updated!')

    res.send(patient);
})

//log in Patients
router.post('/login', async (req,res) => {
    const patient = await Patient.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!patient) {
        return res.status(400).send('Patient not found');
    }

    if(patient && bcrypt.compareSync(req.body.password, patient.passwordHash)) {
        const token = jwt.sign(
            {
                patientId: patient.id,
                isAdmin: patient.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
        res.status(200).send({patient : patient.email , token: token});
    } else {
        res.status(400).send('Authentication Failed');
    }

})

module.exports =router;