const mongoose = require('mongoose');

let medicalRecordSchema = mongoose.Schema({
    _id:{
        type: Number
    },
    diagnosis:{
        type: String,
        required: false
    },
    prescribed_meds:{
        type: String,
        required: false
    },
    notes:{
        type: String,
        required: false
    }
})

let MedRecord = module.exports = mongoose.model('MedRecord', medicalRecordSchema)