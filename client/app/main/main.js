'use strict';

angular.module('whereisdrakeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
      // .when('/twitter', {
      // 	templateUrl: 'Hello',
      	// controller: 'TwitterController'
      //});

  });