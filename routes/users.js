const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User model
let User = require('../models/user');

let Patient = require('../models/patient');
// Register Form
router.get('/register', function(req, res){
	res.render('register');
});

// Register proccess
router.post('/register', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;
	const health_no = req.body.health_no;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is required').isEmail();
	req.checkBody('username', 'Username or ID is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	req.checkBody('health_no', 'Health Number is required').notEmpty();

	let errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors:errors
		});
	} else {
		let newUser = new User({
			name:name,
			email:email,
			username:username,
			password:password,
			health_no:health_no,
		});
		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(newUser.password, salt, function(err, hash){
				if(err){
					console.log(err);
				}
				newUser.password = hash;
				newUser.save(function(err){
					if(err){
						console.log(err);
						return;
					} else {
						req.flash('success','You are now registered and can log in');
						res.redirect('/users/login');
					}
				})
			});
		});
	}
});

// Login form
router.get('/login', function(req, res){
	res.render('login');
});

// Login proccess
router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { 
			req.flash('danger', 'Incorrect username or password');
			return res.redirect('/users/login/'); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			if (user.admin) { return res.redirect('/'); }
			if (!user.admin) { 
			    Patient.findOne(user.health_no, function(err, patient){
			        res.redirect('/patients/' + user.health_no);
			    });
			}

		});
	})(req, res, next);
});




// Logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;





