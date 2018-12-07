let mongoose = require('mongoose')

// Patient schema
let patientSchema = mongoose.Schema({
    _id:{
        type: Number
    },
    name:{
        type: String,
        required: true
    },
    phone_no:{
        type: String
    },
    street_no:{
        type: String,
        required: true
    },
    street_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    province:{
        type: String,
        required: true
    }
})

// variable 'Patient' matching to schema
let Patient = module.exports = mongoose.model('Patient', patientSchema);