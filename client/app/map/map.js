'use strict';

angular.module('whereisdrakeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/map', {
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      });
  });
