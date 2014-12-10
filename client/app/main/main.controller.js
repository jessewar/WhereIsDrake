'use strict';

angular.module('whereisdrakeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    // $scope.drake = {};
    // $http.get('/api/twitter').success(function(data) {
    //   $scope.drake = data;
    // });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

angular.module('whereisdrakeApp')
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