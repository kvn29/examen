require('./api/db.js');
var express = require('express');
var app = express();
var session = require('express-session');
var routesBack = require('./api/routes')
var routesFront = require('./api/routespublic');
var mongoose = require('mongoose');
var bodyParser =  require('body-parser');
var path = require('path');

app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true,
    httpOnly: false,
    secure: false
}));



// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  // Si on essai d'accéder à la home sans session
  console.log(req.path);
  if(!req.session.name && (req.path === '/hotels.html' || req.path === '/hotels')) {

    res.redirect(302, '/');
    // On redirige vers la connexion
  }
  next();
});



// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/api', routesBack);
app.use('/', routesFront);









var port = 3000;
app.listen(port, function() {
	console.log('Prêt sur  http://localhost:' + port);
});
