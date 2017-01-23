var express = require('express');
var router = express.Router();
var path = require('path');

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.name)
    return next();
  else
    return res.sendStatus(401);
};

/////////////////////////////////////////
// ROUTER Pour les pages publics
/////////////////////////////////////////

var ctrlAuthentification = require('./controllers/authentification.controllers.js');

router.route('/connexion').post(ctrlAuthentification.seConnecter);
router.route('/inscription').post(ctrlAuthentification.inscription);
router.route('/deconnexion').get(ctrlAuthentification.seDeconnecter);

router.route('/hotels').get(auth, function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'hotels.html'));
});
router.route('/login').get(function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
router.route('/register').get(function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});


module.exports = router;
