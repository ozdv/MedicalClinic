const mongoose = require('mongoose');

let medicalHistorySchema = mongoose.Schema({
    _patient_no:{
        type: mongoose.Schema.Types.Number,
        ref:'Patient',
        unique: false
    },
    _record_id:{
        type: mongoose.Schema.Types.Number,
        ref: 'MedRecord',
        unique: false
    },
    date_time:{
        type: Date,
        required: true
    }
})

medicalHistorySchema.index({_patient_no: 1, _record_id: 1}, {unique: true, dropDups: true})

let MedHistory = module.exports = mongoose.model('MedHistory', medicalHistorySchema)