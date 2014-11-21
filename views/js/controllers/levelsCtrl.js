app = angular.module('levelsManager', []);

app.controller('levelsCtrl', ['$scope', '$http', function($scope, $http) {
    
    /* VARIABLES */
    
    /* Level */
    var allLevels = [];
    var currentLevel = null;
    var currentLevelNumber = 1;
    
    /* Image selection */
    var selectedIndex = null;
    
    /* Audio */
    var audio = null, readyToPlay = true;
    
    /* Message modal */
    $scope.msg = {title: 'Title', text: 'Text'};    
    
    /***** Should be called only once *****/
    (function() {
    
        $http.get('http://' + location.host + '/level/all').
            success(function(data) {
                allLevels = data;
                loadLevel();
            });    
    })();
    
    var loadLevel = function() {
    
        /* Save reference to current level obj */
        currentLevel = allLevels[currentLevelNumber-1];
        
        selectedIndex = null;
        
        /* Load audio */
        if(audio === null) {
            audio = new Audio();
            
            audio.preload = "auto";
            audio.volume = 1;
            
            audio.addEventListener('ended', function() {
                $scope.$apply();
            });
            
            /*
            audio.addEventListener('canplay', function() {
                readyToPlay = true;
                audio.pause();
                $scope.$apply();
            }); */
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
    
    /* Useful methods to HTML */
    
    $scope.getImages = function() {
        return currentLevel.images;
    };
    
    var getSound = function() {
        return currentLevel.sound;
    };
    
    $scope.getLevel = function() {
        return currentLevelNumber;
    }
    
    $scope.isPlaying = function() {
        return audio != null && audio.duration > 0 && !audio.paused;
    };
    
    $scope.isReadyToPlay = function() {        
        return readyToPlay;
    };
    
    /* Select and response check */
    $scope.selectImage = function(index) {
        selectedIndex = index;   
        
        /* Provisory */
        checkAnswer();
    };
    
    $scope.isSelected = function(index) {
        return index === selectedIndex;
    };
    
    var checkAnswer = function() {
                
        if(currentLevel.correct === currentLevel.images[selectedIndex]) {
            
            $scope.msg = {title: 'Parabéns', text: 'Você acertou!'};
            
            if(currentLevelNumber === allLevels.length)
                $scope.msg = {title: 'Parabéns!!', text: 'Fim de Jogo :)'};
            else {
                currentLevelNumber++;
                loadLevel(); 
            }
        }
        else
            $scope.msg = {title: 'Que pena', text: 'Você errou.'};
        
        $('#msg').modal('show');
    };
    
    //alert($(window).width() + ' ' + $(window).height());
    
}]);