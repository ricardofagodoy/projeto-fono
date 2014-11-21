var fs = require('fs'),
    dao = require('../dao'),
    path = require('path'),
    join = path.join;

module.exports = function(app) {
    
    return {
        getSound: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get sound with ID ' + id);
                
            dao.findById(dao.soundCollection, id, function(err, data) {
                if(err || data === null) next(err);
                              
                //res.header('Content-Type', 'audio/mpeg');
                res.sendfile(data.path);
            });
        },
        
        allSounds: function(req, res, next) {
            
            var page = req.params.page - 1;
            
            dao.count(dao.soundCollection, function(err, data) {
                if(err) next(err);
                
                var count = data*1; 
                var soundsPerPage = app.get('soundsPerPage');
                
                dao.findByPage(dao.soundCollection, soundsPerPage, page, {}, function(err, data) {
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

                dao.save(dao.soundCollection, {name: name, path: path}, function(err, data) {
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