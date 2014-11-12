var imagesController = function(app) {
    
    var fs = require('fs'),
        imageCollection = require('../dao').imageCollection,
        path = require('path'),
        join = path.join;
   
    app.set('photos', __dirname + '/photos');
    
    /* Routes */
    app.get('/images/get',function(req, res, next) {
        imageCollection.find(function(err, data) {
            if(err)
                next(err);
                                
            res.end(JSON.stringify(data));
        });
    });
    
    /* GET to upload image form */
    app.get('/images/upload', function(req, res){
        res.render('images/upload');
    });
    
    /* POST to receive multi-part image */
    app.post('/images/upload', function(req, res, next){
        
        var img = req.files.photo.image;
        
        var name = req.body.photo.name || img.name;
        var path = join(app.get('photos'), name);
        
        fs.rename(img.path, path, function(err){
            if (err) 
                return next(err);
            
            // SAVE TO DATABASE
            
            res.redirect('/images/upload');
        });  
    });
};

module.exports = imagesController;