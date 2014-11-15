var fs = require('fs'),
        imageCollection = require('../dao').imageCollection,
        path = require('path'),
        join = path.join,
        mongojs = require('mongojs');

module.exports = function(app) {
    
    return {
        getImage: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get image with ID ' + id);
            
            imageCollection.findOne({
                _id:mongojs.ObjectId(id)}, 
                function(err, data) {
                    if(err) next(err);
                                
                    res.sendfile(data.path);
                });
        },
    
        uploadImage: function(req, res, next) {
        
            var img = req.files.photo.image;

            var name = req.body.photo.name;
            var path = join(app.get('imagesDirectory'), img.name);

            fs.rename(img.path, path, function(err){
                if (err) 
                    return next(err);

                // SAVE TO DATABASE
                imageCollection.save({name: name, path: path}, function(err, data) {
                    if(err)
                        return next(err);

                    console.log('Photo ' + name + ' upload successfuly.');
                    
                    req.session.messages = {success: name};
                    res.redirect('/images');
                });
            });  
        },
        imagesManagerPage: function(req, res){ 
            res.render('images/index');
        }
    };
};