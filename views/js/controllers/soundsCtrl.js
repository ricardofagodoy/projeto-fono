app = angular.module('soundsManager', ['flow', 'mediaPlayer']);

app.controller('soundsCtrl', ['$scope', '$http', function($scope, $http) {
    
    var audio = null;
    var currentAudio = null;
    
    $scope.sounds = [];
    $scope.page = 1;
    $scope.totalPages = 1;
    
    ($scope.loadPage = function() {
        
        $http.get('http://' + location.host + '/sounds/all/' + $scope.page).
            success(function(data) {
                $scope.sounds = data.data;
                $scope.totalPages = data.pages;
            });      
    })();
    
    $scope.prevPage = function() {
        if($scope.page > 1) {
            $scope.page--;
            $scope.loadPage();
        }          
    };
    
    $scope.nextPage = function() {
        if($scope.page < $scope.totalPages) {
            $scope.page++;
            $scope.loadPage();
        }          
    };
    
    $scope.isPlaying = function() {
        return audio != null && audio.duration > 0 && !audio.paused;
    };
    
    $scope.playAudio = function(id) {
        
        if(audio == null || currentAudio != id) {
            currentAudio = id;
            audio = new Audio('http://' + location.host + '/sounds/get/' + id);
            audio.play();
        } else {
           
            if(audio.paused)
                audio.play();
            else
                audio.pause();            
        }     
    };
    
}]);