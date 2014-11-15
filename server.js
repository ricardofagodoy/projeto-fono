//app.use('/static', express.static(__dirname + '/public'));

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    routes = require('./routes/routes');

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
app.use(express.methodOverride());
app.use(express.cookieParser('secretSeed'));
app.use(express.session());

app.use(function(req, res, next) {
    res.locals(req.session.messages);
    req.session.messages = {};
    next();
});

/* Set Routes to app */
app.use(routes(app));

/* Start server */
var server = app.listen(app.get('port'), function() {
    console.log(app.get('title') + ' started up using port ' + app.get('port') + '!');
});