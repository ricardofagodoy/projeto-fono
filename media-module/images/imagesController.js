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
            
            try {
                id = mongojs.ObjectId(id);
                
                imageCollection.findOne({_id: id}, 
                function(err, data) {
                    if(err || data == null) next(err);
                                
                    res.sendfile(data.path);
                });
                
            } catch(e) {
                 console.log('Image with ID ' + id + ' not found!');
                 res.end('Image with ID ' + id + ' not found!');
            }
        },
        
        allImages: function(req, res, next) {
            
            var page = req.params.page - 1;
            
            imageCollection.count(function(err, data) {
                if(err) next(err);
                
                var count = JSON.stringify(data); 
                var imagesPerPage = app.get('imagesPerPage');
                
                imageCollection.find({}).limit(imagesPerPage).skip(imagesPerPage*page, function(err, data) {
                    if(err) next(err);
                
                    var response = {};
                    
                    response.pages = parseInt(count/imagesPerPage) + (count%imagesPerPage == 0 ? 0 : 1);
                    response.data = data;

                    res.end(JSON.stringify(response));                
                });                  
            });                    
        },
    
        uploadImage: function(req, res, next) {
                        
            var img = req.files.photo;
            var name = req.body.flowFilename;
            
            var path = join(app.get('imagesDirectory'), name);

            fs.rename(img.path, path, function(err){
                if (err) 
                    return next(err);

                // SAVE TO DATABASE
                imageCollection.save({name: name, path: path}, function(err, data) {
                    if(err)
                        return next(err);

                    console.log('Photo ' + name + ' upload successfuly.');
                    
                    //req.session.messages = {success: name};
                    //res.redirect('/images');
                    
                    res.end('Photo ' + name + ' upload successfuly.');
                });
            });  
        },
        imagesManagerPage: function(req, res){ 
            res.render('images/index');
        }
    };
};