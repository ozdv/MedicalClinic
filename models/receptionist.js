let mongoose = require('mongoose');

// Receptionist schema
let receptionistSchema = mongoose.Schema({
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
    start_date:{
        type: Date,
        required: true
    }
})

let Receptionist = module.exports = mongoose.model('Receptionist', receptionistSchema)