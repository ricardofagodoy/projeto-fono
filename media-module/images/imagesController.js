var imagesController = function(app) {
    
    var fs = require('fs'),
        path = require('path'),
        join = path.join;
   
    app.set('photos', __dirname + '/photos');
    
    app.get('/image/get', function (req, res) {
        res.send('thats ok!');
    });
    
    app.get('/images/upload', function(req, res){
        res.render('images/upload');
    });
    
    app.post('/images/upload', function(req, res, next){
        
        var img = req.files.photo.image;
        
        var name = req.body.photo.name || img.name;
        var path = join(app.get('photos'), name);
        
        fs.rename(img.path, path, function(err){
            if (err) 
                return next(err);
            
            res.redirect('/images/upload');
        });  
    });
    
};

module.exports = imagesController;