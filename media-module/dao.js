var mongojs = require('mongojs');
var db = mongojs('mydb');
var mycollection = db.collection('mycollection');

// https://github.com/mafintosh/mongojs