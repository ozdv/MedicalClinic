const express = require('express');
const router = express.Router();

let Doctor = require('../models/doctor')
let Appointment = require('../models/appointment')

// Add doctor
router.get('/add', function (req, res) {
    res.render('add_doctor', {
        title: 'Add Doctor'
    })
})

// Submit POST route for adding a doctor
router.post('/add', function (req, res) {
    req.check('sin')
        .notEmpty().withMessage('SIN is required')
        .isInt().withMessage('SIN must be an integer');
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');
    req.check('phone_no')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Phone number must be a valid phone number');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_doctor', {
            title: 'Add Doctor',
            errors:errors
        })
    } else {
        let doctor = new Doctor();
        doctor._id = req.body.sin;
        doctor.name = req.body.name;
        doctor.phone_no = req.body.phone_no;
        doctor.specialization = req.body.specialization;
        doctor.start_date = Date.now();

        Doctor.findById({_id: doctor._id}, function (err, existing_doctor) {
            if (err) {
                console.log('Check for existing doctor failed: ' + err)
                return
            } if (existing_doctor != null) {
                req.flash('warning', 'This doctor SIN number already exists')
                res.redirect('back')
            } else {
                doctor.save(function (err) {
                    if (err) {
                        console.log('Failed to add doctor: ' + err)
                        return
                    } else {
                        req.flash('success', 'Doctor Added')
                        res.redirect('/doctorslist/')
                    }
                })
            }
        })
    }
})

// Load edit form
router.get('/edit/:id', function (req, res) {
    Doctor.findById(req.params.id, function (err, doctor) {
        res.render('edit_doctor', {
            title: 'Edit Doctor',
            doctor:doctor
        })
    })
})

// Submit POST route for editing a doctor
router.post('/edit/:id', function (req, res) {
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_doctor', {
            title: 'Add Doctor',
            errors:errors
        })
    } else {
        let doctor = {};
        doctor.name = req.body.name;
        doctor.phone_no = req.body.phone_no;
        doctor.specialization = req.body.specialization;

        let query = {_id:req.params.id}

        Doctor.updateOne(query, doctor, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Doctor Updated')
                res.redirect('/doctorslist/')
            }
        })
    }
})

// Delete selected doctor
router.delete('/:id', function (req, res) {
    let doctor_query = {_id:req.params.id}
    let appt_query = {_doctor:req.params.id}

    Doctor.deleteOne(doctor_query, function (err) {
        if (err) {
            console.log(err)
        } else{
            Appointment.deleteMany(appt_query, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    res.send('success')
                }
            })
        }
    })
})

// Get single doctor
router.get('/:id', function (req, res) {
    Doctor.findById(req.params.id, function (err, doctor) {
        res.render('doctor', {
            doctor:doctor
        })
    })
})

module.exports = router;