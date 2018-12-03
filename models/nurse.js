let mongoose = require('mongoose');

// Nurse schema
let nurseSchema = mongoose.Schema({
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

let Nurse = module.exports = mongoose.model('Nurse', nurseSchema)