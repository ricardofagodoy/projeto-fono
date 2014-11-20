app = angular.module('levelsManager', []);

app.controller('levelsCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.images = [];
    $scope.page = 1;
    $scope.totalPages = 1;
    
    ($scope.loadPage = function() {
        
        $http.get('http://' + location.host + '/images/all/' + $scope.page).
            success(function(data) {
                $scope.images = data.data;
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
    
}]);