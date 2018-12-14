let mongoose = require('mongoose');

// Doctor schema
let equipmentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
})

let Equipment = module.exports = mongoose.model('Equipment', equipmentSchema)