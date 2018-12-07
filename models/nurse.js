let mongoose = require('mongoose');

// Nurse schema
let nurseSchema = mongoose.Schema({
    _id:{
        type: Number
    },
    name:{
        type: String,
        required: true
    },
    start_date:{
        type: Date,
        required: true
    }
})

let Nurse = module.exports = mongoose.model('Nurse', nurseSchema)