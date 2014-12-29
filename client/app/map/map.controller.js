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

  // var mapCanvas = document.getElementById('map');
  // var mapOptions = {
  //   center: new google.maps.LatLng(39.8282,-98.5795),
  //   zoom: 4,
  //   mapTypeId: google.maps.MapTypeId.SATELLITE,
  //   scrollwheel: false,
  //   scaleControl: false,
  //   mapTypeControl: false,
  //   draggable: false,
  //   navigationControl: false,
  //   streetViewControl: false,
  //   zoomControl: false,
  //   disableDefaultUI: true

  // }

  // $scope.map = new google.maps.Map(mapCanvas, mapOptions);

  });


