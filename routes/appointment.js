const express = require('express');
const router = express.Router();

let Appointment = require('../models/appointment');

// Get single appointment
router.get('/:id', function (req, res) {
    Appointment.findById(req.params.id, function (err, appointment) {
        res.render('appointment', {
            appointment:appointment
        })
    })
})

module.exports = router;