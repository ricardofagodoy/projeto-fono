var soundsModule = require('../modules/sounds/soundServices.js'),
    imagesModule = require('../modules/images/imageServices.js'),
    levelsModule = require('../modules/levels/levelServices.js');

module.exports = function(app) {
  
    /* Initial page */
    app.get('/', function(req, res) {
        res.render('index');
    });
    
    /* Simple PING */
    app.get('/ping', function(req, res){
        res.end(new Date().toString());
    });
    
    imagesModule = imagesModule(app);
    
    /* Images routings */
    app.get('/images', imagesModule.imagesManagerPage);
    
    app.post('/images/upload', imagesModule.uploadImage);
    app.get('/images/get/:id', imagesModule.getImage);
    app.get('/images/all/:page', imagesModule.allImages);
    app.delete('/images/:id', imagesModule.getImage);
    
    soundsModule = soundsModule(app);
    
    /* Sounds routings */
    app.get('/sounds', soundsModule.soundsManagerPage);
    
    app.post('/sounds/upload', soundsModule.uploadSound);
    app.get('/sounds/get/:id', soundsModule.getSound);
    app.get('/sounds/all/:page', soundsModule.allSounds);
    app.delete('/sounds/:id', soundsModule.getSound);
    
    levelsModule = levelsModule(app);
    
    /* Levels routings */
    app.get('/level', levelsModule.startPage);
    
    app.get('/level/get/:id', levelsModule.getLevel);
    app.get('/level/all', levelsModule.getAllLevels);
    
    return app.router;    
};