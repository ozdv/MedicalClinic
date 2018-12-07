let mongoose = require('mongoose');

// Doctor schema
let equipmentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        default: true
    },
})

let Equipment = module.exports = mongoose.model('Equipment', equipmentSchema)