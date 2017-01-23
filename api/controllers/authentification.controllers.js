var mongoose = require('mongoose');
var Membres = mongoose.model('members');

var path = require('path');
var crypto = require('crypto');

module.exports.seConnecter = function (req, res) {

  if (!req.body.email || !req.body.motdepasse) {
    res.send('login failed');
  } else {
    console.log(req.body);
    const email = req.body.email;
    const motdepasse = req.body.motdepasse;


    Membres.findOne({
      email: email
    }).exec((err, membre) => {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(membre != null) {
          // Si on trouve un membre avec cet email
          var motdepasseMD5 = crypto.createHash('md5').update(motdepasse).digest("hex");


          if(motdepasseMD5 === membre.motdepasse) {
            req.session.name = membre.name;
            req.session.userID = membre._id;
            console.log('Connexion OK')
            res.redirect(302, '/hotels');
          }
          else {
            res.redirect(302, '/login');
          }
        }
        else {
          // Sinon, on redirect vers la page de connexion
          console.log('Pas de membre pour cet email');
          res.redirect(302, '/login');
        }
      }
    });
  }
}
module.exports.seDeconnecter = (req, res) => {
  req.session.destroy();
  console.log('Logout session');
  res.redirect(302, '/');
};

module.exports.inscription = (req, res) => {
  Membres
      .create({
        name : req.body.name,
        email : req.body.email,
        motdepasse : crypto.createHash('md5').update(req.body.motdepasse).digest("hex")
      }, function(err, membre){
        if(err){
          res.status(500).json(err);
        } else {
          req.session.name = membre.name;
          req.session.userID = membre._id;
          res.redirect(302, '/hotels');
        }
      });
};
