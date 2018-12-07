const express = require('express');
const router = express.Router();

let Receptionist = require('../models/receptionist');

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
        receptionist.start_date = Date.now();

        receptionist.save(function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Receptionist Added')
                res.redirect('/receptionistslist/')
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
    let query = {_id:req.params.id}

    Receptionist.deleteOne(query, function (err) {
        if (err) {
            console.log(err)
        }
        res.send('success')
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