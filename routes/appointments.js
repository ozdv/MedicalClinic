const express = require('express')
const router = express.Router()

let Appointment = require('../models/appointment')
let Patient = require('../models/patient')
let Doctor = require('../models/doctor')
let Receptionist = require('../models/receptionist')

// Add appointment
router.get('/add', function (req, res) {
    Patient.find({}, function(err, all_patients){
        if(err){
            console.log(err)
        } else{
            Doctor.find({}, function(err, all_doctors){
                if(err){
                    console.log(err)
                } else{
                    Receptionist.find({}, function(err, all_receptionists){
                        if(err){
                            console.log(err)
                        } else{
                            res.render('add_appointment', {
                                title: 'Add Appointment',
                                patients: all_patients,
                                doctors: all_doctors,
                                receptionists: all_receptionists
                            })
                        }
                    })
                }
            })
        }
    })
})

// Submit POST route for adding an appointment
router.post('/add', function (req, res) {
    // req.check('sin')
    //     .notEmpty().withMessage('SIN is required')
    //     .isInt().withMessage('SIN must be an integer');
    // req.check('name')
    //     .notEmpty().withMessage('Name is required')
    //     .isAscii().withMessage('Name must contain only ASCII characters');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_appointment', {
            title: 'Add Appointment',
            errors:errors
        })
    } else {
        let appointment = new Appointment()
        appointment.patient_health_no = req.body.patient_id
        appointment.doctor_sin= req.body.doctor_sin
        appointment.receptionist_sin= req.body.receptionist_sin
        appointment.type = req.body.type
        appointment.purpose = req.body.purpose
        appointment.diagnosis = req.body.diagnosis
        // TODO - Make date and time set by user instead of using current time/date
        appointment.date_time = Date.now()

        appointment.save(function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Appointment Added')
                res.redirect('/appointments_list/')
            }
        })
    }
})

// Get single appointment
router.get('/:id', function (req, res) {
    Appointment.findById(req.params.id, function (err, appointment) {
        res.render('appointment', {
            appointment:appointment
        })
    })
})

module.exports = router;