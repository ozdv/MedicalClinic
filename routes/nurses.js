const express = require('express');
const router = express.Router();

let Nurse = require('../models/nurse');

// Add Nurse
router.get('/add', function (req, res) {
    res.render('add_nurse', {
        title: 'Add Nurse'
    })
})

// Submit POST route for adding a nurse
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
        res.render('add_nurse', {
            title: 'Add Nurse',
            errors:errors
        })
    } else {
        let nurse = new Nurse();
        nurse._id = req.body.sin;
        nurse.name = req.body.name;
        nurse.start_date = Date.now();

        nurse.save(function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Nurse Added')
                res.redirect('/nurseslist/')
            }
        })
    }
})

// Load edit form
router.get('/edit/:id', function (req, res) {
    Nurse.findById(req.params.id, function (err, nurse) {
        res.render('edit_nurse', {
            title: 'Edit Nurse',
            nurse:nurse
        })
    })
})

// Submit POST route for editing a nurse
router.post('/edit/:id', function (req, res) {
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_nurse', {
            title: 'Add Nurse',
            errors:errors
        })
    } else {
        let nurse = {};
        nurse.name = req.body.name;

        let query = {_id:req.params.id}

        Nurse.updateOne(query, nurse, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Nurse Updated')
                res.redirect('/nurseslist/')
            }
        })
    }
})

// Delete selected nurse
router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id}

    Nurse.deleteOne(query, function (err) {
        if (err) {
            console.log(err)
        }
        res.send('success')
    })
})

// Get single nurse
router.get('/:id', function (req, res) {
    Nurse.findById(req.params.id, function (err, nurse) {
        res.render('nurse', {
            nurse:nurse
        })
    })
})

module.exports = router;