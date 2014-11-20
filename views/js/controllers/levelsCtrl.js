app = angular.module('levelsManager', []);

app.controller('levelsCtrl', ['$scope', '$http', function($scope, $http) {
    
    var levels = [];
    var currentLevel = 2;
    
    var images = [];
    var audio = null;
    
    //alert($(window).width() + ' ' + $(window).height());
    
    /* Should be called only once */
    (function() {
    
        $http.get('http://' + location.host + '/level/all').
            success(function(data) {
                levels = data;
            
                loadLevel();
            });    
    })();
    
    var loadLevel = function() {
    
        if(audio === null) {
            audio = new Audio();
            
            audio.preload = "auto";
            audio.volume = 1;
            
            audio.addEventListener('ended', function() {
                $scope.$apply();
            });
        }
        
        audio.src = 'http://' + location.host + '/sounds/get/' + getSound();
        audio.load();   
    };
    
    $scope.playAudio = function() {
    
        if($scope.isPlaying())
            audio.pause();
        else
            audio.play();     
    };
    
    $scope.getImages = function() {
        return levels[currentLevel-1].images;
    };
    
    var getSound = function() {
        return levels[currentLevel-1].sound;
    };
    
    $scope.getLevel = function() {
        return currentLevel;
    }
    
    $scope.isPlaying = function() {
        return audio != null && audio.duration > 0 && !audio.paused;
    };
    
}]);