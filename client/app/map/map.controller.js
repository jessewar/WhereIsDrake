'use strict';

angular.module('whereisdrakeApp')
  .controller('MapCtrl', function ($scope, $http) {

    $scope.songkick = '';
    $http.get('/api/location')
       .success(function(data) {
        $scope.songkick = data;
        updateCenter(data[data.length -1]);
        addHistory(data[data.length -2]);
        drawArrow(data[data.length-2], data[data.length -1]);
    }).error(function(error) {
     $scope.songkick = error;
    });

    var styles = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "invert_lightness": true
                },
                {
                    "hue": "#435158"
                },
                {
                    "saturation": 10
                },
                {
                    "lightness": 30
                },
                {
                    "gamma": 0.5
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "0.16"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "weight": "0.58"
                }
            ]
        }
    
    ];


 $scope.mapOptions = {
              center: new google.maps.LatLng(0,0),
              zoom: 3,
              scrollwheel: true,
              scaleControl: true,
              mapTypeControl: false,
              draggable: true,
              navigationControl: false,
              streetViewControl: false,
              zoomControl: true,
              disableDefaultUI: true,
              style: styles
            };

  function drawArrow(data1, data2) {

  // Define a symbol using a predefined path (an arrow)
  // supplied by the Google Maps JavaScript API.
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };

  // Create the polyline and add the symbol via the 'icons' property.

  var lineCoordinates = [
    new google.maps.LatLng(data1.lat,data1.lng),
    new google.maps.LatLng(data2.lat,data2.lng)
  ];

  var line = new google.maps.Polyline({
    path: lineCoordinates,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    map: $scope.myMap
  });
}

  function addHistory(data) {
       var coordinates =  new google.maps.LatLng(data.lat,data.lng);
          setTimeout(function() {
                var drakeCircle = new google.maps.Circle({
                center: coordinates,
                strokeColor: 'black',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'blue',
                fillOpacity: 0.15,
                radius: 100000,
                map: $scope.myMap
                });

                var drakeMarker = new google.maps.Marker( {
                position: coordinates,
                animation: google.maps.Animation.BOUNCE,
                map: $scope.myMap,
                icon: {
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 3,
                  strokeWeight: 1.5,
                  fillOpacity: 1,
                  fillColor: 'white'
                }
                });  

            var infoWindow = new google.maps.InfoWindow({
              position:coordinates,
              });
            infoWindow.setContent( data.info + '<br>' + data.city);
            infoWindow.open($scope.myMap,drakeMarker);

          }, 500);
        
  }

   function updateCenter(data) {
       var coordinates =  new google.maps.LatLng(data.lat,data.lng);

       if (typeof $scope.myMap !== 'undefined'){
          $scope.myMap.panTo(coordinates);
          // setTimeout(function() {$scope.myMap.setZoom(15)},1000);

          setTimeout(function() {
                var drakeCircle = new google.maps.Circle({
                center: coordinates,
                strokeColor: 'black',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'blue',
                fillOpacity: 0.15,
                radius: 100000,
                map: $scope.myMap
                });

                var drakeMarker = new google.maps.Marker( {
                position: coordinates,
                animation: google.maps.Animation.BOUNCE,
                map: $scope.myMap,
                icon: {
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 3,
                  strokeWeight: 1.5,
                  fillOpacity: 1,
                  fillColor: 'white'
                }
                });  

            var infoWindow = new google.maps.InfoWindow({
              position:coordinates,
              });
            infoWindow.setContent( data.info + '<br>' + data.city + '<br>' + data.start_date);
            infoWindow.open($scope.myMap,drakeMarker);

          }, 500);
        
        }

       }
  });



