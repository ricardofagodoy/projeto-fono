var soundsController = function(app) {
   
    app.get('/sound/get', function (req, res) {
        res.send('thats ok for sound!');
    });
    
};

module.exports = soundsController;