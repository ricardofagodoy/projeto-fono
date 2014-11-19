var fs = require('fs'),
        soundCollection = require('../dao').soundCollection,
        path = require('path'),
        join = path.join,
        mongojs = require('mongojs');

    var filesChunks = {};

module.exports = function(app) {
    
    return {
        getSound: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get sound with ID ' + id);
            
            try {
                id = mongojs.ObjectId(id);
                
                soundCollection.findOne({_id: id}, 
                function(err, data) {
                    if(err || data == null) next(err);
                                
                    res.sendfile(data.path);
                });
                
            } catch(e) {
                 console.log('Sound with ID ' + id + ' not found!');
                 res.end('Sound with ID ' + id + ' not found!');
            }
        },
        
        allSounds: function(req, res, next) {
            
            var page = req.params.page - 1;
            
            soundCollection.count(function(err, data) {
                if(err) next(err);
                
                var count = JSON.stringify(data); 
                var soundsPerPage = app.get('soundsPerPage');
                
                soundCollection.find({}).limit(soundsPerPage).skip(soundsPerPage*page, function(err, data) {
                    if(err) next(err);
                
                    var response = {};
                    
                    response.pages = parseInt(count/soundsPerPage) + (count%soundsPerPage == 0 ? 0 : 1);
                    response.data = data;

                    res.end(JSON.stringify(response));                
                });                  
            });                    
        },
    
        uploadSound: function(req, res, next) {
                                
            var sound = req.files.sound;
            var name = req.body.flowFilename;
            var path = join(app.get('soundsDirectory'), name);

            fs.rename(sound.path, path, function(err){
                if (err) 
                    return next(err);

                // SAVE TO DATABASE
                soundCollection.save({name: name, path: path}, function(err, data) {
                    if(err)
                        return next(err);

                    console.log('Sound ' + name + ' upload successfuly.');
                    
                    res.end('Sound ' + name + ' upload successfuly.');
                });
            });  
        },
        soundsManagerPage: function(req, res){ 
            res.render('sounds/index');
        }
    };
};