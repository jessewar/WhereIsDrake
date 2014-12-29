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

      var image = {
        url: 'http://images4.fanpop.com/image/photos/15000000/drake-drake-15037884-75-75.jpg',
        size: new google.maps.Size(100,100)
      } 

       if (typeof $scope.myMap !== 'undefined'){
          $scope.myMap.panTo(coordinates);
          setTimeout(function() {$scope.myMap.setZoom(4)},1500);
          setTimeout(function() {$scope.myMap.setZoom(6)},2000);
          setTimeout(function() {$scope.myMap.setZoom(12)},2500);
          setTimeout(function() {$scope.myMap.setZoom(15)},3000);
          setTimeout(function() {$scope.myMap.setZoom(18)},3200);

          setTimeout(function() {

            var marker = new google.maps.Marker({
              map: $scope.myMap,
              position: coordinates,
              animation: google.maps.Animation.DROP,
              title: data.displayName,
              icon: image
              });

            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent( data.displayName);
            infoWindow.open($scope.myMap,marker);

          }, 3300);
        
        }

       }
  });



