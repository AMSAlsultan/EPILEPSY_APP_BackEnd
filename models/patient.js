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
    isAdmin: {
        type: String,
        default: false,
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