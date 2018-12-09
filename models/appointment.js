const mongoose = require('mongoose');

let appointmentSchema = mongoose.Schema({
    _patient:{
        type: mongoose.Schema.Types.Number,
        ref:'Patient',
        unique: false
    },
    _doctor:{
        type: mongoose.Schema.Types.Number,
        ref: 'Doctor',
        unique: false
    },
    _receptionist:{
        type: mongoose.Schema.Types.Number,
        ref: 'Receptionist',
        unique: false
    },
    diagnosis:{
        type: String,
        required: false
    },
    date_time:{
        type: Date,
        required: true
    },
    purpose:{
        type: String,
        required: false
    },
    appointment_type:{
        type: String,
        required: false
    }
})

appointmentSchema.index({_patient: 1, _doctor: 1, _receptionist: 1}, {unique: true, dropDups: true})

let Appointment = module.exports = mongoose.model('Appointment', appointmentSchema)