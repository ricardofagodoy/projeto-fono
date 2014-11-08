'use strict';
var x = 2;

var express = require('express');
var soundsModule = require('./sounds/soundsController.js');
var imagesModule = require('./images/imagesController.js');

var port = process.argv[2] || 5000;
var app = express();

new imagesModule(app);
new soundsModule(app);

var server = app.listen(port, function() {
    console.log('Server started up using port ' + server.address().port);
});