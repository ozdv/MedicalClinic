const express = require('express');
const router = express.Router();

let Receptionist = require('../models/receptionist');
let Appointment = require('../models/appointment')

// Add Receptionist
router.get('/add', function (req, res) {
    res.render('add_receptionist', {
        title: 'Add Receptionist'
    })
})

// Submit POST route for adding a receptionist
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
        res.render('add_receptionist', {
            title: 'Add Receptionist',
            errors:errors
        })
    } else {
        let receptionist = new Receptionist();
        receptionist._id = req.body.sin;
        receptionist.name = req.body.name;
        receptionist.phone_no = req.body.phone_no;
        receptionist.start_date = Date.now();

        Receptionist.findById({_id: receptionist._id}, function (err, existing_recp) {
            if (err) {
                console.log('Check for existing receptionist failed: ' + err)
                return
            } if (existing_recp != null) {
                req.flash('warning', 'This receptionist SIN number already exists')
                res.redirect('back')
            } else {
                receptionist.save(function (err) {
                    if (err) {
                        console.log('Failed to add receptionist: ' + err)
                        return
                    } else {
                        req.flash('success', 'Receptionist Added')
                        res.redirect('/receptionistslist/')
                    }
                })
            }
        })        
    }
})

// Load edit form
router.get('/edit/:id', function (req, res) {
    Receptionist.findById(req.params.id, function (err, receptionist) {
        res.render('edit_receptionist', {
            title: 'Edit Receptionist',
            receptionist:receptionist
        })
    })
})

// Submit POST route for adding a receptionist
router.post('/edit/:id', function (req, res) {
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_receptionist', {
            title: 'Add Receptionist',
            errors:errors
        })
    } else {
        let receptionist = {};
        receptionist.name = req.body.name;
        receptionist.phone_no = req.body.phone_no;

        let query = {_id:req.params.id}

        Receptionist.updateOne(query, receptionist, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Receptionist Updated')
                res.redirect('/receptionistslist/')
            }
        })
    }
})

// Delete selected receptionist
router.delete('/:id', function (req, res) {
    let recep_query = {_id:req.params.id}
    let appt_query = {_receptionist:req.params.id}

    Receptionist.deleteOne(recep_query, function (err) {
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

// Get single receptionist
router.get('/:id', function (req, res) {
    Receptionist.findById(req.params.id, function (err, receptionist) {
        res.render('receptionist', {
            receptionist:receptionist
        })
    })
})

module.exports = router;