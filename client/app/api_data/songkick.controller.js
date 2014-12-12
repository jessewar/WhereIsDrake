angular.module('songkick', [])
	.controller('SongkickController', function($scope, $http) {
		$scope.songkick = '';
		$http.get('/api/songkick').
			success(function(data) {
				$scope.songkick = data;
			}).
			error(function(error) {
				$scope.songkick = error;
			});
	});