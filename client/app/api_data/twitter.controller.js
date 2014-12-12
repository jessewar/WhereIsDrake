angular.module('twitter', [])
  .controller('TwitterController', function($scope, $http) {
    $scope.drake = {};
    $http.get('/api/twitter').
      success(function(data) {
        $scope.drake = data;
      }).
      error(function(error) {
        $scope.drake = error;
      });
  });