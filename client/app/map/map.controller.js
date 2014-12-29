'use strict';

angular.module('whereisdrakeApp')
  .controller('MapCtrl', function ($scope, $http) {

$http.get('/api/twitter').success(function(drake) {
      $scope.tweets = drake;
    });

    $scope.songkick = '';
    $http.get('/api/songkick')
       .success(function(data) {
        $scope.songkick = data;
    }).error(function(error) {
     $scope.songkick = error;
    });

   $scope.mapOptions = {
          center: new google.maps.LatLng(36.109622,-115.1732124),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          scrollwheel: false,
          scaleControl: false,
          mapTypeControl: false,
          draggable: false,
          navigationControl: false,
          streetViewControl: false,
          zoomControl: false,
          disableDefaultUI: true}

  });


