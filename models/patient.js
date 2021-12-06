const mongoose = require ('mongoose');

const patientSchema = mongoose.Schema({
})

exports.Patient = mongoose.model('Patient', patientSchema);