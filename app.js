require('./api/db.js');
var express = require('express');
var app = express();

var routes = require('./api/routes');
var mongoose = require('mongoose');
var bodyparser =  require('body-parser');




var port = 3000;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'));

app.use('/api', routes);


app.listen(port, function() {
	console.log('Prêt sur  http://localhost:' + port);
});
