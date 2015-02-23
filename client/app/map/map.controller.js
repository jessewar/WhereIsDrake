'use strict';

angular.module('whereisdrakeApp')
  .controller('MapCtrl', function ($scope, $http) {

    $scope.songkick = '';
    $http.get('/api/location')
       .success(function(data) {
        $scope.songkick = data;
        update_center(data[0]);
    }).error(function(error) {
     $scope.songkick = error;
    });

 $scope.mapOptions = {
              center: new google.maps.LatLng(0,0),
              zoom: 2,
              mapTypeId: google.maps.MapTypeId.SATELLITE,
              scrollwheel: true,
              scaleControl: false,
              mapTypeControl: false,
              draggable: true,
              navigationControl: false,
              streetViewControl: false,
              zoomControl: true,
              disableDefaultUI: true
            };



   function update_center(data){
       var coordinates =  new google.maps.LatLng(data.lat,data.lng);

      var image = {
        url: '/assets/images/drake.png',
        size: new google.maps.Size(100,100)
      } 

       if (typeof $scope.myMap !== 'undefined'){
          $scope.myMap.panTo(coordinates);
          setTimeout(function() {$scope.myMap.setZoom(4)},1000);
          setTimeout(function() {$scope.myMap.setZoom(6)},1200);
          setTimeout(function() {$scope.myMap.setZoom(8)},1400);
          setTimeout(function() {$scope.myMap.setZoom(10)},1600);
          setTimeout(function() {$scope.myMap.setZoom(11)},1800);
          setTimeout(function() {$scope.myMap.setZoom(12)},2000);
          setTimeout(function() {$scope.myMap.setZoom(13)},2200);
          setTimeout(function() {$scope.myMap.setZoom(14)},2400);
          setTimeout(function() {$scope.myMap.setZoom(15)},2700);
          setTimeout(function() {

            var marker = new google.maps.Marker({
              map: $scope.myMap,
              position: coordinates,
              animation: google.maps.Animation.DROP,
              title: data.info,
              icon: image
              });

            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent( data.info + '<br>' + data.city);
            infoWindow.open($scope.myMap,marker);

          }, 2800);
        
        }

       }
  });



