'use strict';

angular.module('whereisdrakeApp')
  .controller('MapCtrl', function ($scope, $http) {

    $scope.songkick = '';
    $http.get('/api/songkick')
       .success(function(data) {
        $scope.songkick = data;
        update_center(data);
    }).error(function(error) {
     $scope.songkick = error;
    });

 $scope.mapOptions = {
              center: new google.maps.LatLng(0,0),
              zoom: 2,
              mapTypeId: google.maps.MapTypeId.SATELLITE,
              scrollwheel: false,
              scaleControl: false,
              mapTypeControl: false,
              draggable: false,
              navigationControl: false,
              streetViewControl: false,
              zoomControl: false,
              disableDefaultUI: true
            };



   function update_center(data){
       var coordinates =  new google.maps.LatLng(data.venue.lat,data.venue.lng);
       if (typeof $scope.myMap !== 'undefined'){
          $scope.myMap.panTo(coordinates);
          setTimeout(function() {$scope.myMap.setZoom(4)},1500);
          setTimeout(function() {$scope.myMap.setZoom(6)},2000);
          setTimeout(function() {$scope.myMap.setZoom(8)},2500);
          setTimeout(function() {$scope.myMap.setZoom(10)},3000);
          setTimeout(function() {$scope.myMap.setZoom(12)},3500);
          setTimeout(function() {$scope.myMap.setZoom(15)},4000);
          setTimeout(function() {$scope.myMap.setZoom(17)},4200);

       }
      };

  });


