var mongojs = require('mongojs');

var db = mongojs('projeto-fono');

var imageCollection = db.collection('image');
var soundCollection = db.collection('sound');
var levelCollection = db.collection('level');

exports.imageCollection = imageCollection;
exports.soundCollection = soundCollection;
exports.levelCollection = levelCollection;

// https://github.com/mafintosh/mongojs