'use strict';

angular.module('whereisdrakeApp')
  .controller('MapCtrl', function ($scope, $http) {

    $http.get('/api/twitter').success(function(awesomeThings) {
      $scope.tweets = drake;
    });

    $scope.songkick = '';
    $http.get('/api/songkick').
	success(function(data) {
	   $scope.songkick = data;
		}).
        error(function(error) {
	   $scope.songkick = error;
		});
   });

