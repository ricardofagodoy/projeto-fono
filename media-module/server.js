'use strict';

var express = require('express'),
    path = require('path'),
    soundsModule = require('./sounds/soundsController.js'),
    imagesModule = require('./images/imagesController.js');

var port = process.argv[2] || 5000;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.set('title', 'Projeto Fono');

app.get('/ping', function(req, res){
    res.render('ping', {msg: new Date()});
});

new imagesModule(app);
new soundsModule(app);

var server = app.listen(port, function() {
    console.log('Server started up using port ' + server.address().port);
});