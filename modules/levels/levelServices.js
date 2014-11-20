var fs = require('fs'),
    dao = require('../dao'),
    path = require('path'),
    join = path.join;

module.exports = function(app) {
    
    return {
        getLevel: function(req, res, next) {
            
            var id = req.params.id;
            console.log('Get level with ID ' + id);
 
            dao.findById(dao.levelCollection, id, function(err, data) {                                
                res.end(JSON.stringify(data));
            });
        },
        
        getAllLevels: function(req, res, next) {
                
            dao.findAll(dao.levelCollection, function(err, data) {
                if(err || data === null) next(err);

                res.end(JSON.stringify(data));                
            });                  
        },
        
        startPage: function(req, res){ 
            res.render('levels/index');
        }
    };
};