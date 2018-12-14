// 471 Project
// Using mongodb for database system
// Using Node.js instead of php/apache
// Using Express for web framework for nodejs (node module)
// Using nodemon to keep mongodb restarting after each save
// Using mongoose for object modelling for nodejs
// Using body-parser to use with express
// Using bower for front end manager
// Using bootstrap as a package, installed in bower
// using jquery/ajax to process deletion of entities
// Using passport to implement user
// Using Bcrypt JS to encrypt user

const express = require('express')         // brings in express module
const path = require('path')               // core module included with nodejs
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')
const user = require('./models/user');

// Connect to database 'medicalclinic'
mongoose.connect(config.database, { useNewUrlParser: true })

let db = mongoose.connection



// Check db connection
db.once('open', function(){
    console.log('Connected to MongoDB... :)')
})

// Check for db error
db.on('error', function(err){
    console.log(err)
})

// Initializes app so we can create routes
const app = express()

// Bring in Models
let Patient = require('./models/patient')
let Doctor = require('./models/doctor')
let Nurse = require('./models/nurse')
let Receptionists = require('./models/receptionist')
let Equipments = require('./models/equipment')
let Appointment = require('./models/appointment')

// Load view engine
app.set('views', [path.join(__dirname,'views'),
                    path.join(__dirname, 'views/patient/'),
                    path.join(__dirname, 'views/nurse/'),
                    path.join(__dirname, 'views/doctor/'),
                    path.join(__dirname, 'views/receptionist/'),
                    path.join(__dirname, 'views/equipment/'),
                    path.join(__dirname, 'views/appointment/')]);
app.set('view engine', 'pug')

// Set basedir to use absolute paths
app.locals.basedir = path.join(__dirname, 'views')

// Moment.js middleware
app.locals.moment = require('moment')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set Public folder (to add bootstrap)
app.use(express.static(path.join(__dirname, 'public')))

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// Express messages middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res)
    next()
})

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
            var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param   : formParam,
            msg     : msg,
            value   : value
        }
    }
}))

// Passport config
require('./config/passport')(passport)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function(req, res, next){
    res.locals.user = req.user || null
    next()
})

// Home '/' route 
app.get('/', function(req, res){
    Patient.findOne(user.health_no, function(err, patients){
        if(err){
            console.log(err);
        } else{
            res.render('index', {           // loads index.pug
                title: 'Medical Clinic',
                patients: patients
            })
        }
    })
})

// List of patients
app.get('/patientslist', function(req, res){
    Patient.find({}, function(err, patients){
        if(err){
            console.log(err)
        } else{
            res.render('patientslist', {           // loads patientlist.pug
                title: 'Clinic Patients',
                patients: patients
            })
        }
    })
})

// List of doctors
app.get('/doctorslist', function(req, res){
    Doctor.find({}, function(err, doctors){
        if(err){
            console.log(err)
        } else{
            res.render('doctorslist', {
                title: 'Clinic Doctors',
                doctors: doctors
            })
        }
    })
})

// List of nurses
app.get('/nurseslist', function(req, res){
    Nurse.find({}, function(err, nurses){
        if(err){
            console.log(err)
        } else{
            res.render('nurseslist', {
                title: 'Clinic Nurses',
                nurses: nurses
            })
        }
    })
})

// List of receptionlist
app.get('/receptionistslist', function(req, res){
    Receptionists.find({}, function(err, receptionists){
        if(err){
            console.log(err)
        } else{
            res.render('receptionistslist', {
                title: 'Receptionists',
                receptionists: receptionists
            })
        }
    })
})

// List of equipment
app.get('/equipmentslist', function(req, res){
    Equipments.find({}, function(err, equipments){
        if(err){
            console.log(err)
        } else{
            res.render('equipmentslist', {
                title: 'Equipment',
                equipments: equipments
            })
        }
    })
})

// List of appointments
app.get('/appointments_list', function(req, res){
    Appointment.find({}, function(err, appointments){
        if(err){
            console.log(err)
        } else{
            res.render('appointments_list', {
                title: 'Current Appointments',
                appointments: appointments
            })
        }
    })
})

// Route files
let patients = require('./routes/patients')
app.use('/patients', patients)

let equipments = require('./routes/equipments')
app.use('/equipments', equipments)

let users = require('./routes/users')
app.use('/users', users)

let doctors = require('./routes/doctors')
app.use('/doctors', doctors)

let receptionists = require('./routes/receptionists')
app.use('/receptionists', receptionists)

let nurses = require('./routes/nurses')
app.use('/nurses', nurses)

let appointments = require('./routes/appointments')
app.use('/appointments', appointments)

// Start server
app.listen(3000, function(){
    console.log('Server started on port 3000')
})

