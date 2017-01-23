var mongoose = require('mongoose');
// var colors = require('colors');
var dburl = 'mongodb://kvn29:examen3@ds117209.mlab.com:17209/examen3';
var retry = null;
mongoose.connect(dburl);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log(`Mongoose connecté à ${dburl}`);
});
mongoose.connection.on('error', function(err) {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose déconnecté');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
}

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});


require('./hotels.model');
require('./members.model');
