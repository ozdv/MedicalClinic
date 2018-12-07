const mongoose = require('mongoose');

let appointmentSchema = mongoose.Schema({
    patient_health_no:{
        type: mongoose.Types.ObjectId,
        ref:'patients',
        unique: false,
        required: true
    },
    doctor_sin:{
        type: mongoose.Types.ObjectId,
        ref: 'doctors',
        unique: false,
        required: true
    },
    receptionist_sin:{
        type: mongoose.Types.ObjectId,
        ref: 'receptionists',
        unique: false,
        required: true
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

appointmentSchema.index({patient_health_no: 1, doctor_sin: 1, receptionist_sin: 1}, {unique: true, dropDups: true})

let Appointment = module.exports = mongoose.model('Appointment', appointmentSchema)