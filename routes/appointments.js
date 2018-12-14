const express = require('express')
const mongoose = require('mongoose')
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
    // TODO: Add validation 

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_appointment', {
            title: 'Add Appointment',
            errors:errors
        })
    } else {
        let appointment = new Appointment()
        appointment._patient = req.body.patient_id
        appointment._doctor = req.body.doctor_sin
        appointment._receptionist = req.body.receptionist_sin
        appointment.type = req.body.type
        appointment.purpose = req.body.purpose
        appointment.diagnosis = req.body.diagnosis
        appointment.date_time = req.body.date + 'T' + req.body.time + 'Z'

        // Check if this appointment was already made
        Appointment.findOne({_patient: appointment._patient, _doctor: appointment._doctor, _receptionist: appointment._receptionist}, function (err, existing_appt) {
            if (err) {
                console.log("Checking for existing appointment failed: " + err)
                return
            } if (existing_appt) {
                req.flash('warning', 'This appointment already exists. Delete the existing one and try again')
                res.redirect('back')
            } else {
                appointment.save(function (err) {
                    if (err) {
                        console.log("Adding appointment failed: " + err)
                        return
                    } else {
                        req.flash('success', 'Appointment Added')
                        res.redirect('/appointments_list/')
                    }
                })
            }
        })     
    }
})

// Delete selected appointment
router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id}

    Appointment.deleteOne(query, function (err) {
        if (err) {
            console.log(err)
        }
        res.send('success')
    })
})

// Get single appointment
router.get('/:id', function (req, res) {
    Appointment.findById(req.params.id, function (err, appointment) {
        Patient.findById(appointment._patient, function (err, patient) {
            Doctor.findById(appointment._doctor, function (err, doctor) {
                Receptionist.findById(appointment._receptionist, function (err, receptionist) {
                    res.render('appointment', {
                        appointment: appointment,
                        patient: patient,
                        doctor: doctor,
                        receptionist: receptionist
                    })
                })
            })
        })
    })
})

module.exports = router;