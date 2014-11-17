var fs = require('fs'),
        soundCollection = require('../dao').soundCollection,
        path = require('path'),
        join = path.join,
        mongojs = require('mongojs');

module.exports = function(app) {
    
    return {
        getSound: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get sound with ID ' + id);
            
            soundCollection.findOne({
                _id:mongojs.ObjectId(id)}, 
                function(err, data) {
                    if(err) next(err);
                                
                    res.sendfile(data.path);
                });
        },
    
        uploadSound: function(req, res, next) {
        
            var sound = req.files.sound.data;

            var name = req.body.sound.name;
            var path = join(app.get('soundsDirectory'), sound.name);

            fs.rename(sound.path, path, function(err){
                if (err) 
                    return next(err);

                // SAVE TO DATABASE
                soundCollection.save({name: name, path: path}, function(err, data) {
                    if(err)
                        return next(err);

                    console.log('Sound ' + name + ' upload successfuly.');
                    
                    req.session.messages = {success: name};
                    res.redirect('/sounds');
                });
            });  
        },
        soundsManagerPage: function(req, res){ 
            res.render('sounds/index');
        }
    };
};