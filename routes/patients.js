const express = require('express');
const router = express.Router();

// Patient Model
let Patient = require('../models/patient');

// User Model
let User = require('../models/user');

// Add patient route (url/patients/add)
router.get('/add', function(req, res){
    res.render('add_patient', {
        title: 'Add Patient'
    });
});

// Add Submit POST Route for adding a patient
router.post('/add', function(req, res){
    // Form input validation
    req.check('health_no')
        .notEmpty().withMessage('Health number is required')
        .isInt().withMessage('Health number must be an integer');
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');
    req.check('phone_no')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Phone number must be a valid phone number');
    req.check('street_no')
        .notEmpty().withMessage('Street number is required')
        .isInt().withMessage('Street number must be an integer');
    req.check('street_name')
        .notEmpty().withMessage('Street name is required')
        .isAscii().withMessage('Street name must contain only ASCII characters');
    req.check('city')
        .notEmpty().withMessage('City is required')
        .isAlpha().withMessage('City name must contain letters only');
    req.check('province')
        .notEmpty().withMessage('Province is required')
        .isAlpha().withMessage('Province code must contain letters only')
        .isLength({min:2, max:2}).withMessage('Province code must be 2 characters long');

    // Error checking
    let errors = req.validationErrors();
    if(errors){
        res.render('add_patient', {
            title:'Add Patient',
            errors:errors
        });
    } else {
        let patient = new Patient();
        patient._id = req.body.health_no;
        patient.name = req.body.name;
        patient.phone_no = req.body.phone_no;
        patient.street_no = req.body.street_no;
        patient.street_name = req.body.street_name;
        patient.city = req.body.city;
        patient.province = req.body.province;

        Patient.findById({_id: patient._id}, function (err, existing_patient) {
            if (err) {
                console.log('Check for existing patient failed: ' + err)
                return
            } if (existing_patient != null) {
                req.flash('warning', 'This patient health number already exists')
                res.redirect('back')
            } else {
                patient.save(function(err){
                    if(err){
                        console.log('Failed to add patient: ' + err);
                        return
                    } else {
                        req.flash('success', 'Patient Added')
                        res.redirect('/patientslist/')
                    }
                })
            }
        })
    }
});

// Load Edit Form
router.get('/edit/:id', function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        res.render('edit_patient', {
            title:'Edit patient',
            patient:patient
        });
    });
});

// Update submit POST route
router.post('/edit/:id', function(req, res){
    // Form input validation
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');
    req.check('phone_no')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Phone number must be a valid phone number');
    req.check('street_no')
        .notEmpty().withMessage('Street number is required')
        .isInt().withMessage('Street number must be an integer');
    req.check('street_name')
        .notEmpty().withMessage('Street name is required')
        .isAscii().withMessage('Street name must contain only ASCII characters');
    req.check('city')
        .notEmpty().withMessage('City is required')
        .isAlpha().withMessage('City name must contain letters only');
    req.check('province')
        .notEmpty().withMessage('Province is required')
        .isAlpha().withMessage('Province code must contain letters only')
        .isLength({min:2, max:2}).withMessage('Province code must be 2 characters long');

    // Error checking
    let errors = req.validationErrors();
    if(errors){
        Patient.findById(req.params.id, function(err, patient){
            res.render('edit_patient', {
                title:'Edit patient',
                patient:patient,
                errors:errors
            });
        });
    }else{
        let patient = {};
        patient.name = req.body.name;
        patient.phone_no = req.body.phone_no;
        patient.street_no = req.body.street_no;
        patient.street_name = req.body.street_name;
        patient.city = req.body.city;
        patient.province = req.body.province;

        let query = {_id:req.params.id}

        Patient.updateOne(query, patient, function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Patient Updated');
                res.redirect('/patientslist/');
            }
        });
    }
});

// Delete selected patient
router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}

    Patient.deleteOne(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('success');
    });
});

// Get single patient
router.get('/:id', function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        res.render('patient', {
            patient:patient
        });
    });
});

module.exports = router;
