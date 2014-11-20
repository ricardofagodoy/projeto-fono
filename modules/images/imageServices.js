var fs = require('fs'),
    dao = require('../dao'),
    path = require('path'),
    join = path.join;

module.exports = function(app) {
    
    return {
        getImage: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get image with ID ' + id);
 
            dao.findById(dao.imageCollection, id, function(err, data) {                        
                res.sendfile(data.path);
            });
        },
        
        allImages: function(req, res, next) {
            
            var page = req.params.page - 1;
            
            dao.count(dao.imageCollection, function(err, data) {
                if(err) next(err);
                
                var count = data*1; 
                var imagesPerPage = app.get('imagesPerPage');
                
                dao.findByPage(dao.imageCollection, imagesPerPage, page, {}, function(err, data) {
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

                dao.save(dao.imageCollection, {name: name, path: path}, function(err, data) {
                    if(err)
                        return next(err);

                    console.log('Photo ' + name + ' upload successfuly.');                    
                    res.end('Photo ' + name + ' upload successfuly.');
                });
            });  
        },
        
        imagesManagerPage: function(req, res){ 
            res.render('images/index');
        }
    };
};