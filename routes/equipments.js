const express = require('express');
const router = express.Router();

let Equipment = require('../models/equipment');

// Add Equipment
router.get('/add', function (req, res) {
    res.render('add_equipment', {
        title: 'Add Equipment'
    })
})

// Submit POST route for adding a equipment
router.post('/add', function (req, res) {
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');
    req.check('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt().withMessage('Quantity must be an integer value');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_equipment', {
            title: 'Add Equipment',
            errors:errors
        })
    } else {
        let equipment = new Equipment();
        equipment.name = req.body.name;
        equipment.quantity = req.body.quantity;

        Equipment.findById({_id: equipment._id}, function (err, existing_recp) {
            if (err) {
                console.log('Check for existing equipment failed: ' + err)
                return
            } if (existing_recp != null) {
                req.flash('warning', 'This equipment SIN number already exists')
                res.redirect('back')
            } else {
                equipment.save(function (err) {
                    if (err) {
                        console.log('Failed to add equipment: ' + err)
                        return
                    } else {
                        req.flash('success', 'Equipment Added')
                        res.redirect('/equipmentslist/')
                    }
                })
            }
        })        
    }
})

// Load edit form
router.get('/edit/:id', function (req, res) {
    Equipment.findById(req.params.id, function (err, equipment) {
        res.render('edit_equipment', {
            title: 'Edit Equipment',
            equipment:equipment
        })
    })
})

// Submit POST route for adding a equipment
router.post('/edit/:id', function (req, res) {
    req.check('name')
        .notEmpty().withMessage('Name is required')
        .isAscii().withMessage('Name must contain only ASCII characters');
    req.check('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt().withMessage('Quantity must be an integer value');

    // Error checking
    let errors = req.validationErrors()
    if (errors) {
        res.render('add_equipment', {
            title: 'Add Equipment',
            errors:errors
        })
    } else {
        let equipment = {};
        equipment.name = req.body.name;

        let query = {_id:req.params.id}

        Equipment.updateOne(query, equipment, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Equipment Updated')
                res.redirect('/equipmentslist/')
            }
        })
    }
})

// Delete selected equipment
router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id}

    Equipment.deleteOne(query, function (err) {
        if (err) {
            console.log(err)
        }
        res.send('success')
    })
})

// Get single equipment
router.get('/:id', function (req, res) {
    Equipment.findById(req.params.id, function (err, equipment) {
        res.render('equipment', {
            equipment:equipment
        })
    })
})

module.exports = router;