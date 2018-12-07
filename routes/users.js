const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User model
let User = require('../models/user');

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
						res.redirect('/users/stafflogin');
					}
				})
			});
		});
	}
});

// Login form
router.get('/stafflogin', function(req, res){
	res.render('stafflogin');
});

// Login proccess
router.post('/stafflogin', function(req, res, next){
	passport.authenticate('local', {
		successRedirect:'/',
		failureRedirect:'/users/stafflogin/',
		failureFlash: true
	})(req, res, next);
});

// Logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/users/stafflogin');
});

module.exports = router;





