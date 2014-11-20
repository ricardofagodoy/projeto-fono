var mongojs = require('mongojs');
var database = mongojs('projeto-fono');

module.exports = {

    imageCollection: database.collection('image'),
    
    soundCollection: database.collection('sound'),

    levelCollection: database.collection('level'),
    
    findById: function(db, id, callback) {
        
        try {
            db.findOne({_id: mongojs.ObjectId(id)}, callback);
        } catch(ex) {
            console.log('Exception while finding by id: ' + id);
            callback.apply(this, [ex.message]);
        }
    },
    
    save: function(db, data, callback) {
         db.save(data, callback);
    },
    
    findAll: function(db, callback) {
        db.find({}, callback);
    },
    
    findAllOrdered: function(db, orderBy, callback) {
        db.find({}).sort(orderBy, callback);
    },
    
    findByPage: function(db, page, limit, search, callback) {
        db.find(search).limit(limit).skip(limit*page, callback);        
    },
    
    count: function(db, callback) {
        db.count(callback);
    }
};

// https://github.com/mafintosh/mongojs