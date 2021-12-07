const mongoose = require ('mongoose');

const patientSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: { 
        type: Date,
        required: true,
     },
     epilepsyType: { 
        type: String,
        required: true,
     },
     epilepsyTimes: { 
        type: String,
        required: true,
     },
     epilepsyFrequencies: { 
        type: String,
        required: true,
     },
     forHowLong: { 
        type: String,
        required: true,
     },
     epilepsyTriggers: { 
        type: String,
        required: true,
     },
     issues: { 
        type: String,
        required: true,
     },
     address: { 
        type: String,
        required: true,
     }
});

patientSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

patientSchema.set('toJSON', {
    virtuals: true,
});

exports.Patient = mongoose.model('Patient', patientSchema);
exports.patientSchema = patientSchema;