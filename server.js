var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    soundsModule = require('./media-module/sounds/soundsController.js'),
    imagesModule = require('./media-module/images/imagesController.js');

var appProperties = JSON.parse(fs.readFileSync('app.properties'));

var app = express();

app.set('title', appProperties.name);
app.set('port', appProperties.port);
app.set('imagesDirectory', appProperties.imagesDirectory);
app.set('soundsDirectory', appProperties.soundsDirectory);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.limit(appProperties.maxFileSize));
app.use(express.bodyParser());
app.use(app.router);
//app.use('/static', express.static(__dirname + '/public'));

/* Simple PING */
app.get('/ping', function(req, res){
    res.render('ping', {msg: new Date()});
});

new imagesModule(app);
new soundsModule(app);

var server = app.listen(app.get('port'), function() {
    console.log(app.get('title') + ' started up using port ' + app.get('port') + '!');
});