angular.module('twitter', [])
  .controller('TwitterController', function($scope, $http) {
    $scope.drake = {'hello': 'world'};
    $http.get('/api/twitter').
      success(function(data) {
        $scope.drake = data;
      }).
      error(function(data) {
        $scope.drake = {'hello': 'error'};
      });
  });