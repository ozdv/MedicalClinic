let mongoose = require('mongoose');

// Doctor schema
let doctorSchema = mongoose.Schema({
    sin:{
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },
    name:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        default: 'None'
    },
    start_date:{
        type: Date,
        required: true
    }
})

let Doctor = module.exports = mongoose.model('Doctor', doctorSchema)