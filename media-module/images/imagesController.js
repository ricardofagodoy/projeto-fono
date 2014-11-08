var imagesController = function(app) {
   
    app.get('/image/get', function (req, res) {
        res.send('thats ok!');
    });
    
};

module.exports = imagesController;