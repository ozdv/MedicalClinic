let mongoose = require('mongoose')

// Receptionist schema
let receptionistSchema = mongoose.Schema({
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

let Receptionist = module.exports = mongoose.model('Receptionist', receptionistSchema)