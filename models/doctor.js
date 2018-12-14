let mongoose = require('mongoose');

// Doctor schema
let doctorSchema = mongoose.Schema({
    _id:{
        type: Number
    },
    name:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        default: 'None'
    },
    phone_no:{
        type: String
    },
    start_date:{
        type: Date,
        required: true
    }
})

let Doctor = module.exports = mongoose.model('Doctor', doctorSchema)